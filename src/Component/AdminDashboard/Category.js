import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";


import { Table } from "react-bootstrap";

const Product = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3305/products").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }, []);

  // ------delete -----

  async function DeleteProduct(id) {
    let result = await fetch(`http://localhost:3305/productdelete/${id}`, {
      method: "delete",
    });
    let data = await result.json();

    fetch("http://localhost:3305/products").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  }
  // ------------------------------------------------------------------------------
  // const handleShowView = () => setEditShowView(true);
  const [editShowView, setEditShowView] = useState(false);
  //-----------edit----------------------
  // const handleShow = () => setEditShow(true);
  const [editShow, setEditShow] = useState(false);
  // const handleClose = () => setEditShow(false);
  //-------------------------------------------------------
  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  // const [editShow, setEditShow] = useState(false);
  const editHandleClose = () => setEditShow(false);
  const editHandleShow = () => setEditShow(true);

  function editDataDisplay(id) {

    const filterData = data.filter((item) => {
      return item.id === id;
    });
    console.log(filterData[0].name)
    setname(filterData[0].name);
    setPrice(filterData[0].price)
  
    setId(filterData[0].id);
    console.log(name)
    console.log(id)
  }


async function dataEdit() {
  try {
    const updatedData = {
      id: id,
      name: name,
      price: price
    };

    console.log(updatedData);

    const response = await Axios.put(`http://localhost:3305/productsupdate/${id}`, updatedData);

    console.log(response);
    
    // Additional logic if needed after the update

    fetch("http://localhost:3305/products").then((result) => {
      result.json().then((resp) => {
        setData(resp);
      });
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
}


  

  return (
    <div>
        <div class="container">
    <nav>
      <ul>
        <li><a  href="#" style={{textDecoration:"none"}} class="logo">
          <img src="logo192.png"/>
          <span class="nav-item">Admin</span>
        </a></li>
       
        <li><a  href="#" style={{textDecoration:"none"}}>
          <i class="fas fa-comment"></i>
          <span class="nav-item">Message</span>
        </a></li>
        <li><a  href="#" style={{textDecoration:"none"}}>
          <i class="fas fa-database"></i>
          <span class="nav-item">Report</span>
        </a></li>
        <li><a  href="#" style={{textDecoration:"none"}}>
          <i class="fas fa-chart-bar"></i>
          <span class="nav-item">Attendance</span>
        </a></li>
        <li><a  href="#" style={{textDecoration:"none"}}>
          <i class="fas fa-cog"></i>
          <span class="nav-item">Setting</span>
        </a></li>
        <li><a  href="#" style={{textDecoration:"none"}} class="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span class="nav-item">Log out</span>
        </a></li>
      </ul>
    </nav>
    <section class="main">
      
      <div class="users">
        <div class="card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxYyokqg79NqUEO6g7f90dZqkR3nbdpS6dAUIrcDGdDk_9fN_DyH2gMCo58bljK3IAAds&usqp=CAU"/>
          <h6>shopping</h6>
          
        
          <button>view</button>
        </div>
        <div class="card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThChqsr8ZPuMZ0naAyv6ESv5-e5m6Lwc2sfJvBlL5B28MVYbkrjdt9jnhPcNYLeI_5QwU&usqp=CAU"/>
          <h6>shopping</h6>
          
        
          <button>view</button>
        </div>
        <div class="card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYvd-_RWFVtDlbB0jHDpMMLX-DDiuwjtYmcg&usqp=CAU"/>
          <h6>shopping</h6>
          
        
          <button>view</button>
        </div>
        <div class="card">
          <img src="https://static.vecteezy.com/system/resources/previews/004/745/297/original/3d-isometric-paper-shopping-bag-in-circle-icon-shopping-bag-for-advertising-and-branding-collection-for-retail-design-for-web-page-ui-mobile-illustration-for-products-and-things-free-vector.jpg"/>
          <h6>shopping</h6>
          
        
          <button>view</button>
        </div>
      </div>
      <section class="attendance">
        <div class="attendance-list">
          <h3>Product List</h3>
          <table class="table">
            <thead>
            <tr>
                      <th class="bl5"> #</th>
                      <th class="bl5">Product</th>
                      <th class="bl5"> Price</th>

                      <th class="bl5">Picture</th>
                      <th class="bl5">Action</th>
                    </tr>
            </thead>
            <tbody>
                    {data &&
                      data
                        // .filter((val) => {
                        //   if (search == "") {
                        //     return val;
                        //   } else if (
                        //     val.CateName.toLowerCase().includes(
                        //       search.toLowerCase()
                        //     )
                        //   ) {
                        //     return val;
                        //   }
                        // })
                        .map((item, index) => (
                          <tr key={item.id}>
                            <td data-label="User Id">{index + 1}</td>
                            <td data-label="firstName">{item.name}</td>
                            <td data-label="firstName">{item.price}</td>
                            <td>
                              <img
                                width="100"
                                height="80"
                                src="/filename_1704099143928.jpg"
                              />
                              <h1>{item.image}</h1>
                            </td>
                            <td data-label="Action">
                              &nbsp; &nbsp;
                              <button
                               
                                type="button"  data-toggle="modal" data-target="#exampleModal"

                                onClick={() => {
                                  editDataDisplay(item.id);
                                  editHandleShow();
                                }}
                                style={{
                                  backgroundColor: "#DD3333",
                                  color: "white",
                                  border: "none",
                                }}
                              >
                                Edit
                              </button>
                              &nbsp;&nbsp;
                              <button
                                type="button"
                                class="btn btn-primary ab1"
                                onClick={() => DeleteProduct(item.id)}
                                style={{
                                  backgroundColor: "#DD3333",
                                  color: "white",
                                  border: "none",
                                }}
                              >
                                Delete
                              </button>
                              <Modal
                                size="small"
                                show={editShow}
                                onHide={editHandleClose}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Edit Data</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <div class="container-fluid">
                                    {/* <!-- Page Heading --> */}
                                    <div class="d-sm-flex align-items-center justify-content-between mb-4"></div>
                                    <form>
                                      <div class="row">
                                        <div
                                          class="col-md-2"
                                          style={{ marginTop: "6px;" }}
                                        >
                                          Product{" "}
                                        </div>
                                        <div class="col-md-10">
                                          <input
                                            type="text"
                                            class="form-control"
                                            placeholder="Enter Product Name"
                                            style={{ marginBottom: "16px;", height: "100px;" }}
                                            onChange={(e) => {
                                              setname(e.target.value);
                                            }}
                                            value={name}
                                          />
                                        </div>
                                      </div><br/>
                                      <div class="row">
                                        <div
                                          class="col-md-2"
                                          style={{ marginTop: "6px;" }}
                                        >
                                          Price{" "}
                                        </div>
                                        <div class="col-md-10">
                                          <input
                                            type="number"
                                            class="form-control"
                                            placeholder="Enter Product Price"
                                            style={{ marginBottom: "16px;", height: "100px;" }}
                                            onChange={(e) => {
                                              setPrice(e.target.value);
                                            }}
                                            value={price}
                                          />
                                        </div>
                                      </div><br />
                                  
                                    </form>
                                  </div>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={editHandleClose}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={() => {
                                      dataEdit(item.id);
                                      editHandleClose();
                                    }}
                                    style={{
                                      backgroundColor: "#DD3333",
                                      color: "white",
                                      border: "none",
                                    }}
                                  >
                                    Save Changes
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </td>
                          </tr>
                        ))}
                  </tbody>
          </table>
        </div>
      </section>
    </section>
  </div>
    
    </div>
  );
};

export default Product;
