import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { useGetAllUserQuery, useDeleteUserMutation, useUpdateUserMutation } from './userSlice';
import './AdminUserList.css';

const AdminUserList = () => {
    const { data: users = [], isLoading, isError, refetch } = useGetAllUserQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [editUserDialog, setEditUserDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const toast = useRef(null);

    // עדכון הרשימה המסוננת כאשר המשתמשים משתנים
    React.useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    // פונקציה לסינון משתמשים
    const handleSearch = (searchValue) => {
        setGlobalFilter(searchValue);
        
        if (!searchValue || searchValue.trim() === '') {
            setFilteredUsers(users);
            return;
        }
        
        const searchLower = searchValue.toLowerCase().trim();
        const filtered = users?.filter(user => {
            return (
                user.name?.toLowerCase().includes(searchLower) ||
                user.userName?.toLowerCase().includes(searchLower) ||
                user.email?.toLowerCase().includes(searchLower) ||
                user.phone?.toLowerCase().includes(searchLower) ||
                user.adress?.toLowerCase().includes(searchLower) ||
                user.role?.toLowerCase().includes(searchLower)
            );
        });
        
        setFilteredUsers(filtered);
    };

    const roleOptions = [
        { label: '👤 משתמש רגיל', value: 'User' },
        { label: '👑 מנהל', value: 'Admin' }
    ];

    const confirmDeleteUser = (user) => {
        setSelectedUser(user);
        setDeleteUserDialog(true);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
        setSelectedUser(null);
    };

    const confirmEditUser = (user) => {
        // העתקת המשתמש ללא הסיסמה (כדי לא לשלוח סיסמה מוצפנת בחזרה)
        const { password, ...userWithoutPassword } = user;
        setEditedUser({ ...userWithoutPassword, password: '' });
        setEditUserDialog(true);
    };

    const hideEditUserDialog = () => {
        setEditUserDialog(false);
        setEditedUser(null);
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(selectedUser._id).unwrap();
            toast.current.show({
                severity: 'success',
                summary: 'הצלחה',
                detail: 'המשתמש נמחק בהצלחה',
                life: 3000
            });
            setDeleteUserDialog(false);
            setSelectedUser(null);
            refetch();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'שגיאה',
                detail: error?.data?.message || 'לא הצלחנו למחוק את המשתמש',
                life: 3000
            });
        }
    };

    const handleUpdateUser = async () => {
        try {
            // יצירת עותק של המשתמש המעודכן
            const userToUpdate = { ...editedUser };
            
            // מחיקת השדה password אם הוא ריק או undefined
            if (!userToUpdate.password || userToUpdate.password.trim() === '') {
                delete userToUpdate.password;
            }
            
            console.log('Sending update for user:', userToUpdate);
            
            await updateUser(userToUpdate).unwrap();
            toast.current.show({
                severity: 'success',
                summary: 'הצלחה',
                detail: 'המשתמש עודכן בהצלחה',
                life: 3000
            });
            setEditUserDialog(false);
            setEditedUser(null);
            refetch();
        } catch (error) {
            console.error('Update error:', error);
            toast.current.show({
                severity: 'error',
                summary: 'שגיאה',
                detail: error?.data?.message || 'לא הצלחנו לעדכן את המשתמש',
                life: 3000
            });
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-pencil"
                    rounded
                    outlined
                    className="p-button-warning"
                    onClick={() => confirmEditUser(rowData)}
                    tooltip="ערוך משתמש"
                    tooltipOptions={{ position: 'top' }}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDeleteUser(rowData)}
                    tooltip="מחק משתמש"
                    tooltipOptions={{ position: 'top' }}
                />
            </div>
        );
    };

    const roleBodyTemplate = (rowData) => {
        const isAdmin = rowData.role === 'Admin';
        return (
            <span className={`user-role-badge ${isAdmin ? 'admin' : 'user'}`}>
                {rowData.role || 'User'}
            </span>
        );
    };

    const dateBodyTemplate = (rowData) => {
        if (!rowData.createdAt) return '-';
        const date = new Date(rowData.createdAt);
        return date.toLocaleDateString('he-IL');
    };

    const editUserDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideEditUserDialog} />
            <Button label="שמור" icon="pi pi-check" onClick={handleUpdateUser} />
        </React.Fragment>
    );

    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="אישור" icon="pi pi-check" severity="danger" onClick={handleDeleteUser} />
        </React.Fragment>
    );

    if (isLoading) {
        return (
            <div className="admin-user-list-loading">
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '3rem' }}></i>
                <p>טוען משתמשים...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="admin-user-list-error">
                <i className="pi pi-exclamation-circle" style={{ fontSize: '3rem', color: '#ef4444' }}></i>
                <h3>שגיאה בטעינת המשתמשים</h3>
                <Button label="נסה שוב" icon="pi pi-refresh" onClick={refetch} />
            </div>
        );
    }

    return (
        <div className="admin-user-list-container">
            <Toast ref={toast} />

            {/* Hero Section */}
            <div className="admin-user-hero">
                <h1 className="admin-user-hero-title">ניהול משתמשים</h1>
                <p className="admin-user-hero-subtitle">צפייה וניהול כל המשתמשים במערכת</p>
            </div>

            <div className="admin-user-content">
                {/* Statistics Cards */}
                <div className="admin-user-stats-grid">
                    <div className="admin-user-stat-card">
                        <div className="stat-card-icon stat-card-icon-primary">
                            <i className="pi pi-users"></i>
                        </div>
                        <div className="stat-card-content">
                            <h3>{users.length}</h3>
                            <p>סה"כ משתמשים</p>
                        </div>
                    </div>

                    <div className="admin-user-stat-card">
                        <div className="stat-card-icon stat-card-icon-success">
                            <i className="pi pi-shield"></i>
                        </div>
                        <div className="stat-card-content">
                            <h3>{users.filter(u => u.role === 'Admin').length}</h3>
                            <p>מנהלים</p>
                        </div>
                    </div>

                    <div className="admin-user-stat-card">
                        <div className="stat-card-icon stat-card-icon-info">
                            <i className="pi pi-user"></i>
                        </div>
                        <div className="stat-card-content">
                            <h3>{users.filter(u => u.role !== 'Admin').length}</h3>
                            <p>משתמשים רגילים</p>
                        </div>
                    </div>

                    <div className="admin-user-stat-card">
                        <div className="stat-card-icon stat-card-icon-warning">
                            <i className="pi pi-calendar"></i>
                        </div>
                        <div className="stat-card-content">
                            <h3>{users.filter(u => {
                                const createdDate = new Date(u.createdAt);
                                const today = new Date();
                                const diffTime = Math.abs(today - createdDate);
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                return diffDays <= 30;
                            }).length}</h3>
                            <p>חדשים (30 יום)</p>
                        </div>
                    </div>
                </div>

                <div className="admin-user-card">
                    <div className="admin-user-header">
                        <div className="admin-user-stats">
                            <i className="pi pi-table"></i>
                            <span>רשימת משתמשים</span>
                        </div>
                        <div className="admin-user-actions">
                            <div className="admin-user-search">
                                <IconField iconPosition="left">
                                    <InputIcon className="pi pi-search" />
                                    <InputText 
                                        type="search" 
                                        value={globalFilter}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        placeholder="חיפוש לפי שם, אימייל, טלפון..." 
                                        style={{ width: '300px' }}
                                    />
                                </IconField>
                            </div>
                            <Button
                                label="רענן"
                                icon="pi pi-refresh"
                                onClick={refetch}
                                className="p-button-outlined"
                            />
                        </div>
                    </div>

                    <DataTable
                        value={filteredUsers}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="מציג {first} עד {last} מתוך {totalRecords} משתמשים"
                        className="admin-user-table"
                        emptyMessage={globalFilter ? "לא נמצאו תוצאות לחיפוש" : "לא נמצאו משתמשים"}
                        responsiveLayout="scroll"
                        stripedRows
                    >
                        <Column field="name" header="שם" sortable style={{ minWidth: '150px' }}></Column>
                        <Column field="userName" header="שם משתמש" sortable style={{ minWidth: '150px' }}></Column>
                        <Column field="email" header="אימייל" sortable style={{ minWidth: '200px' }}></Column>
                        <Column field="phone" header="טלפון" style={{ minWidth: '120px' }}></Column>
                        <Column field="role" header="תפקיד" body={roleBodyTemplate} sortable style={{ minWidth: '100px' }}></Column>
                        <Column field="createdAt" header="תאריך הצטרפות" body={dateBodyTemplate} sortable style={{ minWidth: '120px' }}></Column>
                        <Column header="פעולות" body={actionBodyTemplate} exportable={false} style={{ minWidth: '150px' }}></Column>
                    </DataTable>
                </div>
            </div>

            {/* Delete Dialog */}
            <Dialog
                visible={deleteUserDialog}
                className="admin-user-dialog"
                style={{ width: '32rem' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="אישור מחיקה"
                modal
                footer={deleteUserDialogFooter}
                onHide={hideDeleteUserDialog}
            >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: '#ffc107' }} />
                    {selectedUser && (
                        <span>
                            האם אתה בטוח שברצונך למחוק את המשתמש <b>{selectedUser.name}</b>?
                            <br />
                            <small style={{ color: '#6c757d' }}>({selectedUser.email})</small>
                        </span>
                    )}
                </div>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                visible={editUserDialog}
                className="admin-user-dialog"
                style={{ width: '32rem' }}
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="עריכת משתמש"
                modal
                footer={editUserDialogFooter}
                onHide={hideEditUserDialog}
            >
                <div className="edit-user-form">
                    {editedUser && (
                        <>
                            <div className="form-field">
                                <label htmlFor="name">שם מלא</label>
                                <InputText
                                    id="name"
                                    value={editedUser.name || ''}
                                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                                    className="w-full"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="userName">שם משתמש</label>
                                <InputText
                                    id="userName"
                                    value={editedUser.userName || ''}
                                    onChange={(e) => setEditedUser({...editedUser, userName: e.target.value})}
                                    className="w-full"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="role">תפקיד</label>
                                <Dropdown
                                    id="role"
                                    value={editedUser.role || 'User'}
                                    options={roleOptions}
                                    onChange={(e) => setEditedUser({...editedUser, role: e.value})}
                                    className="w-full"
                                    placeholder="בחר תפקיד"
                                />
                                {editedUser.role === 'Admin' && (
                                    <small style={{ color: '#667eea', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <i className="pi pi-info-circle"></i>
                                        משתמש זה יקבל הרשאות מנהל מלאות
                                    </small>
                                )}
                            </div>
                            <div className="form-field">
                                <label htmlFor="email">אימייל</label>
                                <InputText
                                    id="email"
                                    value={editedUser.email || ''}
                                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                                    className="w-full"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="phone">טלפון</label>
                                <InputText
                                    id="phone"
                                    value={editedUser.phone || ''}
                                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                                    className="w-full"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="adress">כתובת</label>
                                <InputText
                                    id="adress"
                                    value={editedUser.adress || ''}
                                    onChange={(e) => setEditedUser({...editedUser, adress: e.target.value})}
                                    className="w-full"
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">סיסמה חדשה (אופציונלי)</label>
                                <InputText
                                    id="password"
                                    type="password"
                                    value={editedUser.password || ''}
                                    onChange={(e) => setEditedUser({...editedUser, password: e.target.value})}
                                    className="w-full"
                                    placeholder="השאר ריק כדי לשמור על הסיסמה הקיימת"
                                />
                                <small style={{ color: '#6c757d', marginTop: '0.25rem' }}>
                                    <i className="pi pi-info-circle" style={{ fontSize: '0.875rem' }}></i> השאר ריק אם אינך רוצה לשנות את הסיסמה
                                </small>
                            </div>
                        </>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default AdminUserList;
