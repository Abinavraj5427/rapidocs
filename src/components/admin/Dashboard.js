import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../../firebase";
import Timeline from "../layout/Timeline";

const Dashboard = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState(null);

  function searchData() {
    // admin
    //   .auth()
    //   .getUserByEmail(email)
    //   .then(function (userRecord) {
    //     console.log("Successfully fetched user data:", userRecord.toJSON());
    //   })
    //   .catch(function (error) {
    //     console.log("Error fetching user data:", error);
    //   });
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
            });
        }
      });
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
