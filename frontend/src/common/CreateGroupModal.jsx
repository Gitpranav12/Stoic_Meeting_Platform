// src/common/CreateGroupModal.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Badge,
} from "react-bootstrap";
import searchService from "../api/searchService";
import chatService from "../api/chatService";

export default function CreateGroupModal({ show, onClose }) {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]); // array of user objects
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!show) {
      // reset when modal closed
      setName("");
      setQuery("");
      setSearchResults([]);
      setSelected([]);
    }
  }, [show]);

  // search users as user types (debounced)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || query.trim().length < 1) {
      setSearchResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await searchService.search(query);

        // after getting res from searchService.search(query)
        const me = JSON.parse(localStorage.getItem("loggedInUser") || "null");
        const myId = me?._id || me?.id || null;

        const users = Array.isArray(res.users) ? res.users : [];
        const filtered = users.filter(
          (u) => String(u._id || u.id) !== String(myId)
        );

        setSearchResults(filtered);
      } catch (err) {
        console.error("Search users failed", err);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query, selected]);

  const addUser = (userObj) => {
    if (!userObj) return;
    setSelected((prev) => [...prev, userObj]);
    setSearchResults((prev) =>
      prev.filter((u) => (u._id || u.id) !== (userObj._id || userObj.id))
    );
    setQuery("");
  };

  const removeUser = (userId) => {
    setSelected((prev) =>
      prev.filter((u) => (u._id || u.id) !== String(userId))
    );
  };

  const onCreate = async () => {
    if (!name || name.trim().length < 5) {
      alert("Please enter a group name");
      return;
    }
    if (selected.length < 2) {
      alert("Add at least two participant");
      return;
    }
    try {
      // get current user id from localStorage
      let me = null;
      try {
        me = JSON.parse(localStorage.getItem("loggedInUser") || "null");
      } catch (err) {
        me = null;
      }
      const myId = me?._id || me?.id || null;

      // collect ids from selected participants
      let participantIds = selected.map((u) => u._id || u.id).filter(Boolean);

      // ensure myId is included
      if (myId && !participantIds.some((id) => String(id) === String(myId))) {
        participantIds.unshift(String(myId)); // put creator first
      }

      // dedupe just in case
      participantIds = Array.from(
        new Set(participantIds.map((id) => String(id)))
      );

      // call backend
      const chat = await chatService.createGroup(name.trim(), participantIds);
      const chatId = chat._id || chat.id || chat;
      localStorage.setItem("stoic_select_chat", String(chatId));
      if (window.__refreshChats) window.__refreshChats();
      onClose();
    } catch (err) {
      console.error("Create group failed", err);
      alert(
        err.response?.data?.error || err.message || "Failed to create group"
      );
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Group name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. Weekend Plans"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Add participants</Form.Label>
          <InputGroup>
            <Form.Control
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people by name or email..."
            />
            <InputGroup.Text>{searchLoading ? "..." : "🔎"}</InputGroup.Text>
          </InputGroup>
          <div className="mt-2">
            {selected.map((u) => (
              <Badge key={u._id || u.id} pill bg="secondary" className="me-2">
                {u.name || u.fullName || u.email}{" "}
                <span
                  style={{ cursor: "pointer", marginLeft: 8 }}
                  onClick={() => removeUser(u._id || u.id)}
                >
                  ×
                </span>
              </Badge>
            ))}
          </div>

          {searchResults.length > 0 && (
            <ListGroup className="mt-2">
              {searchResults.map((u) => (
                <ListGroup.Item
                  key={u._id || u.id}
                  action
                  onClick={() => addUser(u)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">
                        {u.name || u.fullName || u.email}
                      </div>
                      <div className="small text-muted">{u.email}</div>
                    </div>
                    <div className="text-muted">Add</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onCreate}>
          Create Group
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
