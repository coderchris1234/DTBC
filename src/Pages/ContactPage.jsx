import ContactHero from '../Components/ContactHero'
import ContactInfo from '../Components/ContactInfo'
import ContactForm from '../Components/ContactForm'
import QRCodeSection from '../Components/QRCodeSection'

const ContactPage = () => {
  return (
    <div>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <QRCodeSection />
    </div>
  )
}

export default ContactPage