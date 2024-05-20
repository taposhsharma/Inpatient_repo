# healthchart-inpatient-asthma
Inpatient instance of HealthChart visualization application.

- in conf folder in build.js replace
    - clientId of development and production with your clientId
    - logging with your log url (where you store your logs)

- in conf folder in issMap.js replace
    - "fhir.epic.com": {
        "redirectUri": "https://localhost:8080/index.html"
       }, with your respective url

- in conf folder in healthchartConfig.js replace 
    - grouper id and row according to your code and row name (the “grouper” key is used to point to medication groupers within the EHR that are 
      organization specific.)
    - orgDeptMap change it ("orgDeptMap” maps dual-purpose departments (e.g. allergy and pulmonary) to a single category.)
    - in ignoredDepts add department to ignore (“ignoredDepts” is used to identify departments to ignore.)
    - icuList contains ICU department of organisation
    - "noteKey” controls where Rich Text Format data is stored in the EHR, which can optionally be retrieved by an EHR feature known as a SmartLink and
      included in a clinician’s note.
    - The “Resources” section is controlled by the “resources” key in this file, which includes configuration specific to each organization.