import Radium from 'radium'
import React from 'react'
import { Field, reduxForm, submit } from 'redux-form'

import IconClose from 'react-icons/lib/md/close'

import Button from 'components/Button'
import ResponsiveBox from 'components/ResponsiveBox'
import TextBox from 'components/inputs/TextBox'
import modal from 'decorators/Modal'

import style from './style'

const toNumber = value => parseInt(value) || ''

@reduxForm({ form: 'preset', enableReinitialize: true })
class PresetForm extends React.Component {
  render() {
    const { handleSubmit, initialValues:preset } = this.props

    return (
      <div style={style.form}>
        <form ref="form" onSubmit={handleSubmit}>
          <div style={style.row}>
            <label style={style.label}>Hash</label>
            <Field component={TextBox}
              name="hash"
              readOnly={true}
            />
            <p style={style.desc}>Hash will be generated after creating the preset.</p>
          </div>
          <div style={style.row}>
            <label style={style.label}>Name</label>
            <Field component={TextBox}
              name="name"
              placeholder="Resize Preferences"
              readOnly={preset.isDefault}
            />
          </div>
          <div style={style.row}>
            <label style={style.label}>Quality</label>
            <Field component={TextBox}
              name="values.quality"
              placeholder="75"
              normalize={toNumber}
            />
            <p style={style.desc}>Adjusts the jpeg|miff|png|tiff compression level. Value ranges from 0 to 100 (best).</p>
          </div>
          <div style={style.row}>
            <label style={style.label}>Step</label>
            <Field component={TextBox}
              name="values.step"
              placeholder="8"
              normalize={toNumber}
            />
            <p style={style.desc}>Adjusts size of images after resizing. Value should be a multiple of 8.</p>
          </div>
        </form>
      </div>
    )
  }

  submit() {
    console.log('xxx')
  }
}

@modal('preset')
class PresetModal extends React.Component {
  render() {
    const { onOverlayClick, modalData:preset } = this.props

    return [
      <div key="overlay"
        style={style.overlay} onClick={onOverlayClick}>
      </div>,
      <div key="modal" style={style.wrapper}>
        <div style={style.content}>
          <div style={style.header}>
            <div onClick={this._chooseAction('cancel')}>
              <IconClose size={16} />
            </div>
          </div>
          <PresetForm
            ref="presetForm"
            initialValues={preset}
            onSubmit={this._chooseAction('save')}
          />
          <ResponsiveBox style={style.control}>
            <Button style={style.confirmButton}
              onClick={this._submit()}>save</Button>
            {
              preset.isDefault || !preset.hash ?
                null :
                <span style={style.cancelButton}
                  onClick={this._chooseAction('delete', preset.hash)}>delete this preset</span>
            }
            {/*<span style={style.cancelButton}
              onClick={this._chooseAction('cancel')}>cancel & close</span>*/}
          </ResponsiveBox>
        </div>
      </div>
    ]
  }

  _submit() {
    const { dispatch } = this.props

    return () => {
      dispatch(submit('preset'))
    }
  }

  _chooseAction(action, hash) {
    const { onAction } = this.props

    return preset => {
      if (!onAction) {
        return
      }

      onAction(action, hash || preset)
    }
  }
}

export default PresetModal
