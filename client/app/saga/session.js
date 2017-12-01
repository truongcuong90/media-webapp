import { delay } from 'redux-saga'
import { cancel, call, fork, put, race, select, take } from 'redux-saga/effects'

import { SESSION } from 'actions/session'
import { redirect, replace } from 'actions/location'
import { head, post } from 'services/rest'
import { clear, get, set } from 'services/storage'

const TOKEN_STORAGE_KEY = 'jwt'

function* createSession({ data, token }) {
  try {
    const session = yield call(post, {
      url: '/api/sessions',
      data: data
    }, {
      token: token
    })

    yield set(TOKEN_STORAGE_KEY, session.token)
    yield put({
      type: SESSION.CREATE_SUCCESS,
      payload: session
    })

    if (!data.refresh) {
      const lastLocation = yield select(state => state.location.last)
      yield put(replace(lastLocation.pathname))
    }

    return session
  } catch (e) {
    yield clear(TOKEN_STORAGE_KEY)
    yield put({
      type: SESSION.CREATE_FAILURE,
      error: e
    })

    return null
  }
}

function* destroySession(reason) {
  yield clear(TOKEN_STORAGE_KEY)
  yield put({
    type: SESSION.DESTROY_SUCCESS,
    payload: reason
  })
  yield put(redirect('/'))

  return null
}

function* authorize(payload, token) {
  // if there is no token, try get it from state
  if (!token) {
    let session = yield select(state => state.session)

    token = session.token
  }

  const { response, signOut } = yield race({
    response: call(createSession, {
      data: payload,
      token: token
    }),
    signOut: take(SESSION.DESTROY_REQUEST)
  })

  if (signOut) {
    yield call(destroySession)
    return null
  }

  return response
}

export default function* root() {
  let token = yield get(TOKEN_STORAGE_KEY)
  let session

  if (token) {
    // refresh stored token
    session = yield call(authorize, {
      refresh: true
    }, token)
  }

  while (true) {
    if (!session) {
      // wait for sign-in
      const { payload } = yield take(SESSION.CREATE_REQUEST)
      session = yield call(authorize, payload)
    }

    if (!session) continue

    while (true) {
      const { expired, signOut, verify } = yield race({
        expired: delay((session.ttl > 5e3) ? (session.ttl - 5e3) : 0),
        signOut: take(SESSION.DESTROY_REQUEST),
        verify: take(SESSION.VERIFY_REQUEST)
      })

      if (verify) {
        try {
          yield call(head, {
            url: '/api/sessions'
          }, {
            token: session.token
          })
        } catch (e) {
          session = yield call(destroySession, e)
        }
      } else if (expired) {
        // refresh token
        session = yield call(authorize, {
          refresh: true
        })
      } else if (signOut) {
        // sign out
        session = yield call(destroySession)
      }

      if (!session) {
        break
      }
    }
  }
}