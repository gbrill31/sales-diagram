import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  FormGroup,
  Form,
  Input,
  Label,
  Col,
  Spinner,
} from 'reactstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PlaceFriendArea.scss';

import { setNewFriendDialog, saveNewFriend } from '../../actions';

const PlaceFriendArea: React.FC = () => {
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [sales, setSales] = useState(0);

  const {
    isNewFriendDialog,
    friendAttachId,
    setNewFriendPending,
    setNewFriendError,
  } = useSelector((state: any) => state.friends);

  const screenCoordinates = useRef({ x: 0, y: 0 });

  const closeNewFriendDialog = useCallback(
    () => dispatch(setNewFriendDialog(false)),
    [dispatch]
  );

  const saveFriend = useCallback((friend) => dispatch(saveNewFriend(friend)), [
    dispatch,
  ]);

  const closePlacer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    closeNewFriendDialog();
  };

  const openNewFriendForm = (e: React.MouseEvent<HTMLDivElement>) => {
    screenCoordinates.current = {
      x: e.pageX,
      y: e.pageY,
    };

    setIsFormOpen(true);
  };

  const closeForm = () => setIsFormOpen(false);

  const handleSaveFriend = () => {
    const { x, y } = screenCoordinates.current;
    saveFriend({
      attachId: friendAttachId,
      x,
      y,
      name,
      totalSales: sales,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSales(Number(e.target.value));
  };

  const isSaveAllowed = () => name.length > 0;

  useEffect(() => {
    if (!isNewFriendDialog && isFormOpen) {
      setIsFormOpen(false);
      setName('');
      setSales(0);
    }
  }, [isNewFriendDialog, isFormOpen]);

  return (
    isNewFriendDialog && (
      <>
        <div className="placeWrapper">
          <div className="placeBg" onClick={openNewFriendForm}></div>
          {!isFormOpen && (
            <h1 className="header">Click anywhere to place a new friend</h1>
          )}
          <Button className="placeCloseBtn" close onClick={closePlacer}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {isFormOpen && (
          <div className="friendForm">
            <Form className="formContainer">
              <FormGroup row>
                <h4 className="formHeader">Add a New Friend</h4>
              </FormGroup>
              <FormGroup row>
                <Label for="name" sm={2}>
                  Name
                </Label>
                <Col sm="10">
                  <Input
                    autoFocus
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    id="friendName"
                    placeholder="enter friend name"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="sales" sm={2}>
                  Sold
                </Label>
                <Col sm="10">
                  <Input
                    type="number"
                    min="0"
                    name="sales"
                    value={sales}
                    onChange={handleSalesChange}
                    id="friendSales"
                    placeholder="enter sales"
                  />
                </Col>
              </FormGroup>
              {setNewFriendError && (
                <p className="saveError">
                  Something went wrong, unable to save
                </p>
              )}
              <FormGroup className="formActions" row>
                <Button
                  color="primary"
                  className="rightSpace"
                  onClick={handleSaveFriend}
                  disabled={!isSaveAllowed()}
                >
                  {setNewFriendPending ? (
                    <Spinner color="light" size="sm" />
                  ) : (
                    'Save'
                  )}
                </Button>
                <Button color="secondary" onClick={closeForm}>
                  Change Position
                </Button>
              </FormGroup>
            </Form>
          </div>
        )}
      </>
    )
  );
};

export default PlaceFriendArea;
