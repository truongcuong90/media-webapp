import prefix from 'helpers/vendor-prefix'
import linkStyle from 'components/Link/style'
import { COLOR, FONT_SIZE } from 'styles/constants'
import { columnLayout } from 'styles/layout'

export default prefix({
  wrapper: {
    ...columnLayout.wrapper,
    maxWidth: '900px',
    flexDirection: 'column'
  },
  project: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '15px'
  },
  usage: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '30px',
    display: 'block'
  },
  code: {
    fontFamily: 'monospace',
    fontSize: FONT_SIZE.smallxx,
    background: COLOR.lightGray,
    padding: '15px',
    marginBottom: '5px',
    display: 'block',
    overflow: 'auto'
  },
  desc: {
    marginTop: '5px',
    fontSize: FONT_SIZE.smallx
  },
  other: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '30px'
  },
  presetList: {
    marginLeft: '15px',
    marginRight: '15px',
    marginBottom: '30px'
  },
  presetHeading: {
    color: COLOR.darkGray,
    fontWeight: 700
  },
  toggleDisable: {
    marginRight: '15px',
    marginBottom: '5px'
  },
  delete: {
    ...linkStyle,
    fontSize: FONT_SIZE.smallx,
    display: 'inline-block',
    whiteSpace: 'nowrap',
    marginLeft: '15px',
    marginRight: '15px'
  }
})
