import { useEffect, useMemo, useState } from "react";
import { latinAlphabets } from "./fixture-data/allAlphabetList";
import { GET_CONTACTS } from "./constants/endpoints";
import ContactDetail from "./components/contactDetail";
import { ContactType } from "./types/contact";

import "./App.scss";
import "./assets/contact.scss";

console.log('latinAlphabets', latinAlphabets)

function App() {
  const [originalContacts, setOriginalContacts] = useState<ContactType[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactType[]>([]);
  const [currentContactDetail, setCurrentContactDetail] = useState<string | null>(null);
  const [selectedAlphabet, setSelectedAlphabet] = useState<string>("a");
  const [countOfAlphabet, setCountOfAlphabet] = useState<Record<string, number>>({})
  const allAlphabet = useMemo<string[]>(() => latinAlphabets, [latinAlphabets]);

  useEffect(() => {
    const getContactsList = async () => {
      await fetch(GET_CONTACTS(50))
        .then((res) => res.json())
        .then(({ results }) => {
          setOriginalContacts(() => results);
        });
    };

    getContactsList();
  }, []);

  useEffect(() => {
    const filteredData: ContactType[] = originalContacts.filter((contact) => {
      const firstLetterOfName = contact.name.first.charAt(0).toLowerCase();
      return firstLetterOfName === selectedAlphabet;
    });
    setFilteredContacts(filteredData);
  }, [originalContacts, selectedAlphabet]);

  const toggleDetail = (id: string | null) => {
    if (id === currentContactDetail) {
      setCurrentContactDetail(null);
    } else setCurrentContactDetail(id);
  };

  useEffect(() => {
    countEachGroup()
  }, [originalContacts])

  const countEachGroup = () => {  
    // Reseting count at first
    setCountOfAlphabet({})  

    originalContacts?.forEach((contact) => {
      const firstLetterOfName = contact.name.first.charAt(0).toLowerCase();
      
        setCountOfAlphabet((oldValue) => {          
          if (!oldValue[firstLetterOfName]) {
            return { ...oldValue, [firstLetterOfName]: 1 }
          } else {            
            return { ...oldValue, [firstLetterOfName]: oldValue[firstLetterOfName] + 1 }
          }
        })
    })
  }

  return (
    <div className="container">
      <header>
        <ul className="tabs">
          {allAlphabet.map((alphabet) => (
            <>
              <li
                className={`tabs-items ${
                  alphabet === selectedAlphabet && "tabs-items--is-active"
                }`}
                onClick={() => setSelectedAlphabet(alphabet)}
              >
                {alphabet}
                <span className="count-of-alphabet">{countOfAlphabet[alphabet]}</span>
              </li>
            </>
          ))}
        </ul>
        <div className="contact-list">
          {filteredContacts?.length ? (
            filteredContacts.map((contact) => (
              <div className="contact-list--item" key={contact.cell}>
                <p
                  className="contact-list--name"
                  onClick={() => toggleDetail(contact.cell)}
                >
                  {`${contact.name.last} , ${contact.name.first} `}
                </p>
                {contact.cell === currentContactDetail && (
                  <ContactDetail
                    contact={contact}
                    toggleDetail={(state: string | null) => toggleDetail(state)}
                  />
                )}
              </div>
            ))
          ) : (
            <h3> There is no any contact !</h3>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
