import CommonApi from "./CommonApi";

export const RegisterEMS=(data)=>{
    return CommonApi("POST", data, "http://127.0.0.1:8000/register/", "")
}

export const LoginEMS=(data)=>{
    return CommonApi("POST", data, "http://127.0.0.1:8000/token", "")
}

export const ChangePassword=(data,header)=>{
    return CommonApi("PUT", data, "http://127.0.0.1:8000/changePassword/change_pass/", header);
}

export const CreateProfile = (data, header) => {
    return CommonApi("POST", data, "http://127.0.0.1:8000/profile/create_profile/", header);
}

export const GetProfile = (header) => {
    return CommonApi("GET", "", "http://127.0.0.1:8000/profile/view_profile/", header);
}

export const UpdateProfile = (data, header) => {
    return CommonApi("PUT", data, "http://127.0.0.1:8000/profile/edit_profile/", header);
};

export const CreateForm = (data, headers) => {
  return CommonApi("POST", data, "http://127.0.0.1:8000/forms/", headers);
}

export const CreateField = (formId, data, headers) => {
    return CommonApi("POST", data, `http://127.0.0.1:8000/forms/${formId}/fields/`, headers);
}

export const SubmitEmployeeData = (formId, data, headers) => {
    return CommonApi("POST", data, `http://127.0.0.1:8000/forms/${formId}/employees/`, headers);
}

export const GetFormFields = (formId, headers) => {
    return CommonApi("GET", null, `http://127.0.0.1:8000/forms/${formId}/fields/`, headers);
};

export const GetEmployees = (headers) => {
  return CommonApi("GET", "", "http://127.0.0.1:8000/employees/", headers);
}

export const DeleteEmployees = (id,headers) => {
  return CommonApi("DELETE", "", `http://127.0.0.1:8000/employees/${id}/`, headers);
}