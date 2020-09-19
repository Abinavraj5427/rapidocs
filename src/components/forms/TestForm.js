import React, { useCallback, useState, useEffect } from "react";
import firebase from "firebase";

const TestForm = (props) => {
    return (
        <form className="navbar">
            <label for="tname">Test name: </label>
            <input type="text" id="tname" name="tname" value={props.tname} /> 

        </form>
    );
};

export default TestForm; 