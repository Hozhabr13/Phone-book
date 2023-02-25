import { ContactType } from "../types/contact";

export const ContactDetailList = ({contact} : {contact: ContactType}) => {
    
    const lists: Record<string, string | number> = {
        ['e-email']: contact.email,
        ['phone']: contact.phone,
        ['street']: `${contact?.location?.street.number}${contact?.location?.street.name}`,
        ['city']: contact?.location?.city,
        ['state']: contact?.location?.state,
        ['postcode']: contact?.location?.postcode
    }
    return (
    <>
        <ul className='detail-list'>
        <h1> {`${contact.name.last} , ${contact.name.first}`} </h1>
            {
                Object.keys(lists).map((item) => (
                <li key={item}>
                    <strong>{ item }</strong><span>{lists[item]}</span>
                </li> 
                ))
            }
        </ul>
    </>
)}

export default ContactDetailList;