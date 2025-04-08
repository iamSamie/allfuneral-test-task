type CompanyStatus = "active";

export interface Photo {
  "name": string;
  "filepath": string;
  "thumbpath": string;
  "createdAt": string;
}

export interface Company {
  "id": string;
  "contactId": string;
  "name": string;
  "shortName": string;
  "businessEntity": string;
  "contract": {
    "no": string;
    "issue_date": string;
  },
  type: string[];
  // "type": [
  //   "funeral_home",
  //   "logistics_services",
  //   "burial_care_contractor",
  // ],
  "status": CompanyStatus;
  "createdAt": string;
  "updatedAt": string;
  "photos": Photo[];
}
