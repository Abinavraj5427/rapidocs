import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../../firebase";

const Dashboard = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

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

    var ref = db.ref("patients");
    ref
      .orderByChild("name")
      .equalTo(email)
      .on("child_added", function (snapshot) {
        console.log(snapshot.key);
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
    </div>
  );
};

export default Dashboard;
