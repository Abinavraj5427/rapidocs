import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../../firebase";
import Timeline from "../layout/Timeline";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const Dashboard = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState(null);

  function searchData() {
    console.log("search initiated for " + email);

    let ref = db.ref("patients");
    ref
      .orderByChild("email")
      .equalTo(email)
      .on("child_added", function (snapshot) {
        let temp = snapshot.key;
        if (temp) {
          setUid(temp);
          ref
            .child(temp)
            .once("value")
            .then(function (sn) {
              console.log(sn.val());
              createPDF(sn.val());
            });
        }
      });
  }

  function createPDF(values) {
    console.log(values);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    var address = "28011 Bracken Hurst Drive";
    var birthday = "4414-04-04";
    var city = "Katy";
    var insurance = "jdfh";
    var name = "Steven yao";
    var pharmacyAddress = "fd";
    var pharmacyCity = "df";
    var pharmacyPhone = "jg";
    var pharmacyName = "58";
    var pharmacyState = "dfg";
    var phone = "219031203";
    var state = "Texas";
    var zip = "77494";

    var tests = [
      {
        text: "TEST DETAILS\n\n",
        style: "header",
      },
    ];

    var allTests = values.tests ? values.tests : {};

    Object.keys(allTests).map((test) => {
      tests.push("Date: " + allTests[test].date);
      tests.push("Title: " + allTests[test].title);
      tests.push("\n\n");
    });
    tests.push("\n\n");

    var doctors = [
      {
        text: "DOCTORS DETAILS\n\n",
        style: "header",
      },
    ];

    var allDoctors = values.doctors ? values.doctors : {};

    Object.keys(allDoctors).map((entry) => {
      doctors.push("Name: " + allDoctors[entry].name);
      doctors.push("Phone: " + allDoctors[entry].phone);
      doctors.push("Specialty: " + allDoctors[entry].specialty);
      doctors.push("\n\n");
    });
    doctors.push("\n\n");

    var allergies = [
      {
        text: "ALLERGY DETAILS\n\n",
        style: "header",
      },
    ];

    var allAllergy = values.allergies ? values.allergies : {};

    Object.keys(allAllergy).map((entry) => {
      allergies.push("Name: " + allAllergy[entry].name);
      allergies.push("Date: " + allAllergy[entry].date);
      allergies.push("Severity: " + allAllergy[entry].severity);
      allergies.push("Type: " + allAllergy[entry].type);
      allergies.push("\n\n");
    });
    allergies.push("\n\n");

    var appointments = [
      {
        text: "APPOINTMENT DETAILS\n\n",
        style: "header",
      },
    ];

    var allAppointments = values.appointments ? values.appointments : {};

    Object.keys(allAppointments).map((entry) => {
      appointments.push("Doctor: " + allAppointments[entry].doctor);
      appointments.push("Date: " + allAppointments[entry].date);
      appointments.push("Location: " + allAppointments[entry].location);
      appointments.push("Reason: " + allAppointments[entry].reason);
      appointments.push("Time: " + allAppointments[entry].time);
      appointments.push("\n\n");
    });
    appointments.push("\n\n");

    var diagnosis = [
      {
        text: "DIAGNOSIS DETAILS\n\n",
        style: "header",
      },
    ];

    var allDiagnosis = values.diagnosis ? values.diagnosis : {};

    Object.keys(allDiagnosis).map((entry) => {
      diagnosis.push("Doctor: " + allDiagnosis[entry].doctor);
      diagnosis.push("Date: " + allDiagnosis[entry].date);
      diagnosis.push("Name: " + allDiagnosis[entry].name);
      diagnosis.push("Severity: " + allDiagnosis[entry].severity);
      diagnosis.push("Type: " + allDiagnosis[entry].type);
      diagnosis.push("\n\n");
    });
    diagnosis.push("\n\n");

    var meds = [
      {
        text: "MEDICATIONS DETAILS\n\n",
        style: "header",
      },
    ];

    var allMeds = values.medications ? values.medications : {};

    Object.keys(allMeds).map((entry) => {
      meds.push("Doctor: " + allMeds[entry].doctor);
      meds.push("Date: " + allMeds[entry].date);
      meds.push("Dosage: " + allMeds[entry].dosage);
      meds.push("Frequency: " + allMeds[entry].frequency);
      meds.push("Medication Name: " + allMeds[entry].medicationName);
      meds.push("Reason: " + allMeds[entry].reason);
      meds.push("Start: " + allMeds[entry].start);
      meds.push("\n\n");
    });
    meds.push("\n\n");

    var procedures = [
      {
        text: "PROCEDURES DETAILS\n\n",
        style: "header",
      },
    ];

    var allProcedures = values.procedures ? values.procedures : {};

    Object.keys(allProcedures).map((entry) => {
      procedures.push("Location: " + allProcedures[entry].location);
      procedures.push("Date: " + allProcedures[entry].date);
      procedures.push("Type: " + allProcedures[entry].type);
      procedures.push("Title: " + allProcedures[entry].title);
      procedures.push("\n\n");
    });
    procedures.push("\n\n");

    var content = [
      {
        text: "PERSONAL DETAILS\n\n",
        style: "header",
      },
      "Name: " + name,
      "Phone: " + phone,
      "Birthday: " + birthday,
      "Address: " + address,
      "City: " + city,
      "State: " + state,
      "ZIP: " + zip,
      "\n\n",
      {
        text: "PHARMACY DETAILS\n\n",
        style: "header",
      },
      "Pharmacy Name: " + pharmacyName,
      "Pharmacy Address: " + pharmacyAddress,
      "Pharmacy City: " + pharmacyCity,
      "Pharmacy State: " + pharmacyState,
      "Pharmacy Phone: " + pharmacyPhone,
      "\n\n",
      {
        text: "INSURANCE DETAILS\n\n",
        style: "header",
      },
      "Insurance: " + insurance,
      "\n\n",
    ];

    content = content.concat(
      tests,
      doctors,
      allergies,
      appointments,
      diagnosis,
      meds,
      procedures
    );
    var docDefinition = {
      content: content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };
    pdfMake.createPdf(docDefinition).download();
    // var pdfDoc = printer.createPdfKitDocument(docDefinition);
    // pdfDoc.pipe(fs.createWriteStream('document.pdf'));
    // pdfDoc.end();
  }

  return (
    <div>
      <form className="form">
        <div className="center">
          <div className="verticalAlign">
            <div className="tile">
              <label>Enter Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
              ></input>
              <input
                type="submit"
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  searchData();
                }}
                value="Search Details"
              ></input>
            </div>
          </div>
        </div>
      </form>
      {uid && <Timeline uid={uid} />}
    </div>
  );
};

export default Dashboard;
