import color from 'color'
import { fontStyle } from 'styles/global'

export const buttonStyle = {
  ...fontStyle,
  width: '100%',
  color: color('#ffffff'),
  background: color('#2ea664'),
  border: 'none',
  borderRadius:'.25rem',
  padding: '.75rem',
  WebkitAppearance: 'none',
  textAlign: 'center',
  userSelect: 'none',
  fontWeight: 900,
  cursor: 'pointer',
  fontSize: '20px'
}