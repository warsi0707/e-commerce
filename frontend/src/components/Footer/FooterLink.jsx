import { Link } from 'react-router'

export default function FooterLink({title, link}) {
  return (
   <Link to={link}>{title}</Link>
  )
}
