import React from "react";
import AutoFilterDropDown from "./AutoFilterDropDown";
import { useUsers } from "../hook/useUser";

export default function UserDropdown() {
  const { users, selectedUser, handleUserChange } = useUsers();

  return (
    <div>
      <AutoFilterDropDown
        data={users}
        filterProperty="name"
        valueChange={handleUserChange}
      />
      <br />
      {selectedUser && <div>Selected User: {selectedUser.name}</div>}
    </div>
  );
}
