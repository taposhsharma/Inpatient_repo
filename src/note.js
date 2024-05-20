import { search } from "./http.js";
import chartConfig from "../conf/healthchartConfig.js";
import { log } from "./logger.js";
import { tokenResponse } from "./shared.js";

// Initialize list
var followedByList=[];

function followedBy(specialty) {
    if (["Allergy", "Primary Care", "Pulmonary"].indexOf(specialty) !== -1) {
        if (followedByList.indexOf(specialty) === -1) {
            followedByList.push(specialty);
        }
    }
}

function countToRTF() {
    // Configure RTF
    var rtf = ["{\\b Asthma History (Past 12 Months):}\\par"];
    chartConfig.rows.forEach(function(v) {
        if (v.header && v.name != "Other") {
            rtf.push("{\\ul " + v.name + "}\\par");
        } else {
            if (v.name == "Inpatient") {
                rtf.push("{   \\bullet  Hospitalizations: " + v.count + (v.count ? " (" + v.legend.label + " " + v.legend.count + ")" : "") + "}\\par");
            } else if (v.name == "Emergency Only") {
                rtf.push("{   \\bullet  " + v.name + ": " + (v.count - v.legend.count) + "}\\par");
                rtf.push("{   \\bullet  Urgent Care: " + v.legend.count + "}\\par");
            } else if (v.name == "Systemic Steroid") {
                rtf.push("{   \\bullet  " + v.name + ": " + v.count + "}\\par");
            } else if (v.name == "Controller") {
                var yesNo = v.count > 0 ? "Yes" : "No";
                rtf.push("{   \\bullet  " + v.name + ": " + yesNo + "}\\par");
            }
        }
    });

    // Sort followedByList
    followedByList.sort();
    if (followedByList.length > 0) {
        var optionText = [followedByList.slice(0, -1).join(", ")];
        if (followedByList.length > 2) {
            optionText.push.apply(optionText, followedByList.slice(-1));
            optionText = optionText.join(", and ");
        } else if (followedByList.length > 1){
            optionText.push.apply(optionText, followedByList.slice(-1));
            optionText = optionText.join(" and ");
        } else {
            optionText = followedByList.join("");
        }
        rtf.push("{   \\par  Followed by " + optionText + "}\\par");
    }

  

    // Store RTF in EHR key value store
  
}

export {
    countToRTF,
    followedBy
};