import { ajax } from 'helpers/ajax'
import prefix from 'helpers/prefix-map'

export const PROJECT = prefix('project', {
  ...ajax('CREATE'),
  ...ajax('FETCH'),
  ...ajax('FETCH_ALL'),
  ...ajax('UPDATE'),
  ...ajax('DELETE')
})

export function createProject(project) {
  return {
    type: PROJECT.CREATE_REQUEST,
    payload: project
  }
}

export function fetchProjects() {
  return {
    type: PROJECT.FETCH_ALL_REQUEST
  }
}

export function fetchProject(slug) {
  return {
    type: PROJECT.FETCH_REQUEST,
    payload: slug
  }
}

export function updateProject(project) {
  return {
    type: PROJECT.UPDATE_REQUEST,
    payload: project
  }
}
