import React, {useState} from 'react';
import firebase from 'firebase';
import { render } from '@testing-library/react';

const MyDoctor = () => {
    const[title, setTitle] = useState(undefined);
    const[procedurePerformed, setProcedurePerformed] = useState(undefined);
    const[date, setDate] = useState(undefined);
    const[type, setType] = useState(undefined);

    return (
        <form
        className='form'
        id = "doctor_form"
          onSubmit={e => {
            // e.preventDefault();
            // let user = firebase.auth().currentUser;
            // if (user) {
            //   const phoneNumber = user.phoneNumber;
            //   firebase
            //     .database()
            //     .ref('patients/' + phoneNumber)
            //     .set(formData);
            // }
         }
        }
        >
            <div className = "center">

                <div className = "verticalAlign">

                    <div className = 'tile'>
                      
                        <h1>Procedure</h1>
                        <label>Procedure Title</label>
                        <input type = "text" value = {title} onChange = {e => setTitle(e.target.value)}></input>
                        <label>Procedure Performed</label>
                        <input type = "text" value = {procedurePerformed} onChange = {e => setProcedurePerformed(e.target.value)}></input>
                        <label>Date Performed</label>
                        <input type = "date" value = {date} onChange = {e => setDate(e.target.value)}></input>
                        <label>Type</label>
                        <input type = "text" value = {type} onChange = {e => setType(e.target.value)}></input>
                        <input type = "submit" value = "Add Procedure" onClick = {() => {
                            
                        }}></input>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default MyDoctor;
