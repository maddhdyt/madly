import React, { useState } from 'react';
import MainLayout from '../../../Layouts/MainLayout';
import { useForm, router, Head, usePage } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import UserFormSlideOver from './UserFormSlideOver';
import ConfirmModal from '../../../Components/ConfirmModal';
import Pagination from '../../../Components/Pagination';

export default function Index({ users, showToast }) {
    const { delete: destroy } = useForm();
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const authUser = usePage().props.auth?.user || { id: null };

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsSlideOverOpen(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsSlideOverOpen(true);
    };

    const handleDelete = (id) => {
        setUserToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            destroy(route('admin.users.destroy', userToDelete), {
                onSuccess: () => {
                    setIsConfirmModalOpen(false);
                    setUserToDelete(null);
                    if (showToast) showToast('User deleted successfully');
                },
                onError: (errors) => {
                    setIsConfirmModalOpen(false);
                    if (showToast) showToast(errors.error || 'Failed to delete user', 'error');
                }
            });
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
            <Head title="User Management" />

            {/* Header Area */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-gray-800 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">User Management</h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Manage team members and access.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleAddUser}
                        className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-sm flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add User
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-x-auto bg-white dark:bg-gray-900">
                {users.data.length > 0 ? (
                    <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        <thead className="bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest font-extrabold border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-8 py-5">Name</th>
                                <th className="px-8 py-5">Email</th>
                                <th className="px-8 py-5">Joined Date</th>
                                <th className="px-8 py-5">Role</th>
                                <th className="px-8 py-5 text-right sticky right-0 bg-white dark:bg-gray-900 z-10">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                            {users.data.map((user) => (
                                <tr key={user.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-xs">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="font-bold text-gray-900 dark:text-white text-sm">
                                                        {user.name}
                                                        {authUser.id === user.id && <span className="ml-2 text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-bold">You</span>}
                                                    </div>
                                                </div>
                                            </td>
                                    <td className="px-8 py-5">
                                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{user.email}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{new Date(user.created_at).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                                            user.role === 'admin' 
                                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                                                : user.role === 'manager'
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right sticky right-0 bg-white dark:bg-gray-900 group-hover:bg-gray-50 dark:group-hover:bg-gray-800/50 z-10 transition-colors">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                        onClick={() => handleEditUser(user)}
                                                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                                                        title="Edit User"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    {authUser.id !== user.id && (
                                                        <button 
                                                            onClick={() => handleDelete(user.id)}
                                                            className="p-2 text-gray-400 hover:text-red-500 bg-white dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800 transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl mx-8 mt-8">
                        <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Users Found</h3>
                        <p className="text-sm text-gray-500 mt-1">Start by adding your first team member.</p>
                    </div>
                )}
                
                {users.data.length > 0 && (
                    <div className="p-8 border-t border-gray-100 dark:border-gray-800">
                        <Pagination links={users.links} />
                    </div>
                )}
            </div>

            <UserFormSlideOver 
                isOpen={isSlideOverOpen} 
                onClose={() => setIsSlideOverOpen(false)} 
                user={selectedUser} 
                showToast={showToast}
            />

            <ConfirmModal 
                isOpen={isConfirmModalOpen} 
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? They will lose access to the system."
                confirmText="Delete"
            />
        </div>
    );
}

Index.layout = page => <MainLayout children={page} />;
