import React, { useState, useEffect } from "react";
import { getRoles, updateRolePermissions } from "../services/mockApi";

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles().then(setRoles);
    }, []);

    const handlePermissionChange = (roleId, permissionType, value) => {
        const updatedRoles = roles.map((role) =>
            role.id === roleId
                ? {
                      ...role,
                      permissions: { ...role.permissions, [permissionType]: value },
                  }
                : role
        );
        setRoles(updatedRoles);

        // Update the mock API
        const updatedRole = updatedRoles.find((role) => role.id === roleId);
        updateRolePermissions(roleId, updatedRole.permissions).then((response) => {
            if (!response.success) {
                alert("Failed to update permissions");
            }
        });
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Role Management</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Role Name
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Read
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Write
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                Update
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr
                                key={role.id}
                                className="border-b last:border-none hover:bg-gray-100"
                            >
                                <td className="px-4 py-4 text-gray-700">{role.name}</td>
                                <td className="px-4 py-4">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        checked={role.permissions.read}
                                        onChange={(e) =>
                                            handlePermissionChange(role.id, "read", e.target.checked)
                                        }
                                    />
                                </td>
                                <td className="px-4 py-4">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        checked={role.permissions.write}
                                        onChange={(e) =>
                                            handlePermissionChange(role.id, "write", e.target.checked)
                                        }
                                    />
                                </td>
                                <td className="px-4 py-4">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        checked={role.permissions.update}
                                        onChange={(e) =>
                                            handlePermissionChange(role.id, "update", e.target.checked)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoleManagement;
