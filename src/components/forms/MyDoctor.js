import React, {useState} from 'react';
import firebase from 'firebase';
import { render } from '@testing-library/react';

const MyDoctor = () => {
    const[doctors, setDoctors] = useState([{
        id:0,
        name: "Vitaly Roshetnikov",
        number: "111-111-111",
    },
    {
        id:1,
        name: "Donald Trump",
        number: "222-222-222",
    }
    ])
    const[curName, setCurName] = useState(undefined);
    const[curNumber, setCurNumber] = useState(undefined);

    return (
        <form
        className='form'
        id = "doctor_form"
        //   onSubmit={e => {
        //     e.preventDefault();
        //     let user = firebase.auth().currentUser;
        //     if (user) {
        //       const phoneNumber = user.phoneNumber;
        //       firebase
        //         .database()
        //         .ref('patients/' + phoneNumber)
        //         .set(formData);
        //     }
        //  }
        //}
        >
            <div className = "center">
                <h1>MyDoctors</h1>

                <div className = "verticalAlign">
                    {/* Show doctors */}
                    {
                        doctors.map(doctor => 
                            <div className = 'tile'>
                                <h2>Doctor {doctor.id+1}</h2>
                                <label>Name</label>
                                <input type = "text" value = {doctor.name}></input>
                                <label>Phone</label>
                                <input type = "text" value = {doctor.number}></input>
                            </div>
                        )
                    }

                    <div className = 'tile'>
                        <label>Name</label>
                        <input type = "text" value = {curName} onChange = {e => setCurName(e.target.value)}></input>
                        <label>Phone</label>
                        <input type = "text" value = {curNumber} onChange = {e => setCurNumber(e.target.value)}></input>
                        <input type = "submit" value = "Add Doctor" onClick = {() => {
                            setDoctors([...doctors, {id: doctors.length+1, name:curName, number:curNumber}]);
                        }}></input>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default MyDoctor;
