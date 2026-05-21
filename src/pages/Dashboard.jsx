import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Col, Row } from "react-bootstrap"

import { getClient } from '../features/contact/contactSlice'
import { getUser } from '../features/user/userSlice'

const Dashboard = () => {

  const dispatch = useDispatch()

  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)


  const { clients, status, error } = useSelector(
    (state) => state.contact
  )

    const { users } = useSelector(
    (state) => state.user
  )

  console.log(users)


  useEffect(() => {
    dispatch(getClient())
    dispatch(getUser())
  }, [dispatch])

  console.log(clients)
  console.log(users)

  return (
    <div>

      <h1>Dashboard</h1>

      {status === "loading" && <p>Chargement...</p>}

      {error && <p>{error}</p>}

      <Card className="border-0 shadow-sm overflow-hidden">
        <Row className="g-0 align-items-center">
          <Col md={6}>
            <Card.Body className="p-5">
              <h2>Clients</h2>
              <h3>Total des demandes : {clients.length}</h3>
              <div className='d-flex flex-row container-clients'>
              {clients.map((client) => (
                <div 
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                >
                  <Button className='primary m-1'>{client.name}</Button>
                </div>
              ))}
              </div>
              {selectedClient && (
                <div>
                  <h2>{selectedClient.name}</h2>

                  <p>{selectedClient.email}</p>

                  <p>{selectedClient.message}</p>

                  <p>{selectedClient.created_at}</p>
                </div>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
       <Card className="border-0 shadow-sm overflow-hidden">
        <Row className="g-0 align-items-center">
          <Col md={6}>
            <Card.Body className="p-5">
              <h2>Utilisateurs</h2>
              <h3>Nombre d'utilisateurs : {users.length}</h3>
              <div className='d-flex flex-row container-clients'>
              {Array.isArray(users) && users.map((user) => (
    <div
        key={user.id}
        onClick={() => setSelectedUser(user)}
    >
        <Button className='primary m-1'>
            {user.username}
        </Button>
    </div>
))}
              </div>
              {selectedUser && (
                <div>
                  <h2>{selectedUser.first_name}</h2>

                  <h3>{selectedUser.last_name}</h3>

                  <p>{selectedUser.email}</p>

                  <p>{selectedUser.message}</p>

                  <p>{selectedUser.created_at}</p>
                </div>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>

  )
}

export default Dashboard