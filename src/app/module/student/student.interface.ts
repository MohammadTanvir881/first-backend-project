
export type Guardian = {
    fathersName : string;
    fathersOccupation : string;
    fathersContactNo : string;
    mothersName : string;
    mothersOccupation : string;
    mothersContactNumbers : string;
}

export type UserName = {
    firstName : string;
    middleName : string;
    lastName : string;
}

export type LocalGuardian = {
    name : string;
    occupation : string;
    contactNo : string;
    address : string;
}

export type Student =  {
    id : string;
    name: UserName;
    gender : "male" | "female";
    dateOfBirth? : string;
    email: string;
    contactNo : string;
    emergencyContactNumber : string;
    bloodGroup : 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    presentAddress : string;
    permanentAddress : string;
    guardian : Guardian;
    localGuardian : LocalGuardian ;
    profileImg : false ;
    isActive : "active" | "block"
    
  }