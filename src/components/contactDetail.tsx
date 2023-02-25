import React from 'react';
import ContactDetailList from './ContactDetailList';
import { ContactType } from '../types/contact';
import '../assets/contact.scss';

const contactDetail = ({ contact, toggleDetail } : { contact: ContactType, toggleDetail: (state: string | null) =>  any}) => {
    return (
       <div className="card-view">
            <div className='avatar-section'>
                <img src={require('../assets/icons/close.png')} alt="close" className='close-icon' onClick={()=>toggleDetail(null)} />
                <img src={contact?.picture.medium} alt={contact.name.first} className="profile" />
            </div>
            <div className='detail-section'>
                <ContactDetailList contact={contact} />
            </div>
       </div>
    )
}
export default contactDetail;