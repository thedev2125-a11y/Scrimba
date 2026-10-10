import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
export default function Footer() {
  return (
    <div className="Footer">
        <ul>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
        </ul>
    </div>
  )
}
