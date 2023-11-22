import Navbar from '../components/Navbar';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { Modal } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import Expenses from '../components/Expenses';
import Income from '../components/Income';
//import Remaining from '../components/Remaining';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

export const BudgetPage = () => {

    const [cookies] = useCookies(['userID']);
    const userID = cookies.userID;

    const [data, setData] = useState([])

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');


    const [showAddCategory, setShowAddCategory] = useState(false);
    const handleCloseAddCategory = () => setShowAddCategory(false);
    const handleShowAddCategory = () => setShowAddCategory(true);


    const [categoryIDToDelete, setCategoryIDToDelete] = useState('');
    const [showDeleteCategory, setShowDeleteCategory] = useState(false);
    const handleCloseDeleteCategory = () => setShowDeleteCategory(false);
    const handleShowDeleteCategory = (categoryID) => {
        setCategoryIDToDelete(categoryID);
        setShowDeleteCategory(true);
    };


    useEffect(() => {
        Axios.get(API + '/categories/' + userID).then((json) => setCategories(json.data));
    }, [userID]);

    const addCategory = async () => {
        try {
            const response = await Axios.post(API + '/categories/add', {
                userID: userID,
                categoryName: categoryName,
            });
            console.log(response);
            handleCloseAddCategory();
            window.location.reload(true);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const deleteCategory = async () => {
        try {
            const response = await Axios.delete(API + '/categories/delete', {
                data: { categoryID: categoryIDToDelete },
            });
            console.log(response);
            handleCloseDeleteCategory();
            window.location.reload(true);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const renderCategories = () => {
        return categories.map(c => {
            if (c.categoryID === categoryName) {
                return ( <option value={c.categoryID} selected>{c.categoryName}</option> )
            } else {
                return ( <option value={c.categoryID}>{c.categoryName}</option> )
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                {/* Income, Expenses, Remaining Sections */}
                <div className="row mt-3">
                    {/* Income Section */}
                    <div className="col-sm-4">
                        <h4>Income</h4>
                        <Income />
                    </div>

                    {/* Expenses Section */}
                    <div className="col-sm-4">
                        <h4>Total Expenses</h4>
                        <Expenses />
                    </div>

                    {/* Remaining Section */}
                    <div className="col-sm-4">
                        <h4>Remaining Balance</h4>
                        {/* <Remaining /> */}
                    </div>
                </div>
                <h3 className="mt-3">Budget Categories</h3>
                <button className="btn btn-success mt-3 float-right" onClick={handleShowAddCategory}>
                    Add Category
                </button>

                {/* Categories Table */}
                <div className="row mt-3">
                    <div className="col-sm">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th />
                                
                                </tr>
                            </thead>
                            <tbody>{renderCategories()}</tbody>
                        </table>
                    </div>
                </div>

                {/* Pop Up to Add Category */}
                <Modal show={showAddCategory} onHide={handleCloseAddCategory} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={addCategory}>
                            <div className="col-sm">
                                <div className="col-sm">
                                    <label htmlFor="categoryName">Category Name</label>
                                    <input
                                        required="required"
                                        type="text"
                                        className="form-control"
                                        value={categoryName}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                        id="categoryName"
                                    ></input>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-success-outline" onClick={handleCloseAddCategory}>
                            Cancel
                        </button>
                        <button className="btn btn-success" onClick={addCategory}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>

                {/* Pop Up to Confirm Category Deletion */}
                <Modal
                    show={showDeleteCategory}
                    onHide={handleCloseDeleteCategory}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete?
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-warning-outline" onClick={handleCloseDeleteCategory}>
                            Cancel
                        </button>
                        <button className="btn btn-warning" onClick={deleteCategory}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};
