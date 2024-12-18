import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import { useEffect, useState, useRef } from 'react';
import Modal from './components/Modal';
import MainCard from './components/MainCard';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPWD, setCurrentPWD] = useState("/");
  const [modalOpen, setModalOpen] = useState(false);
  const [FolderOrFile, setFolderOrFile] = useState('');
  const [currentWorkingFile, setCurrentWorkingFile] = useState({})
  let savedDataStructure = []
  if (localStorage.getItem('dataStructure849')) {
    savedDataStructure = JSON.parse(localStorage.getItem('dataStructure849'));
  }
  const [dataStructure, setDataStructure] = useState(savedDataStructure);
  let savedCards = []
  if (localStorage.getItem('cards849')) {
    savedCards = JSON.parse(localStorage.getItem('cards849'));
  }
  const [cards, setCards] = useState(savedCards);
  function toggleSidebar() {
    setSidebarOpen(prev => !prev);
  }
  function openFolder(pwd) {
    setCurrentPWD(currentPWD == '/' ? currentPWD + pwd : currentPWD + '/' + pwd);
  }
  function backFolder() {
    setCurrentPWD(pwd => {
      let newPWD = pwd.split('/').slice(0, -1).join('/')
      if (newPWD == '') {
        return '/'
      } else {
        return newPWD;
      }
    });
  }
  const inputFileFolder = useRef(null);
  function createFolderOrFile(type) {
    setModalOpen(true);
    setFolderOrFile(type);
    inputFileFolder.current?.focus();
  }
  function closeFolderOrFile() {
    setModalOpen(false);
  }

  function create(title) {
    setDataStructure([...dataStructure, {
      id: uuidv4(),
      name: title,
      type: FolderOrFile,
      pwd: currentPWD
    }])
  }

  useEffect(function () {
    localStorage.setItem('dataStructure849', JSON.stringify(dataStructure));
  },[dataStructure]);

  useEffect(function () {
    localStorage.setItem('cards849', JSON.stringify(cards));
  },[cards]);

  function openFile(name, id) {
    setCurrentWorkingFile({name, id});
    setSidebarOpen(false);
  }

  function addCardToFile(frontSide, backSide, id) {
    setCards(cards => [...cards, {frontSide, backSide, fileId: id, id: uuidv4()}]);
  }

  function changeCardState(cardId, state) {
    setCards(cards => cards.map(card => card.id == cardId ? {...card, state} : card));
  }

  function flipCards() {
    setCards(cards => cards.map(card => card.fileId == currentWorkingFile.id ? {...card, frontSide: card.backSide, backSide: card.frontSide} : card));
  }
  function resetCards() {
    setCards(cards => cards.map(card => card.fileId == currentWorkingFile.id ? {...card, state: null} : card));
  }
  function changeCard(cardId, type, value) {
    setCards(cards => cards.map(card => card.id == cardId ? {...card, [type]: value} : card));
  }
  function removeItem(type, id) {
    if (type == 'file' || type == 'folder') {
      setDataStructure(d => d.filter(item => item.id != id));
      if (currentWorkingFile.id == id) {
        setCurrentWorkingFile({});
      }
    } else if (type == 'card') {
      setCards(cards.filter(c => c.id != id));
    }
  }


  return (
    <div className="mx-auto relative container" onKeyDown={(e) => {if (e.key == 'Escape') {setModalOpen(false)}}}>
        <Topbar onClick={toggleSidebar} sidebarOpen={sidebarOpen}/>
        <div className='grid grid-cols-1 md:grid-cols-[15rem_minmax(0,1fr)]'>
          <Sidebar sidebarOpen={sidebarOpen} dataStructure={dataStructure} openFolder={openFolder} currentPWD={currentPWD} backFolder={backFolder} createFolderOrFile={createFolderOrFile} openFile={openFile} removeItem={removeItem} />
          <MainCard currentWorkingFile={currentWorkingFile} addCardToFile={addCardToFile} cards={cards} changeCardState={changeCardState} flipCards={flipCards} resetCards={resetCards} changeCard={changeCard} removeItem={removeItem} />
        </div>
        {modalOpen ? <Modal inputFileFolder={inputFileFolder} closeFolderOrFile={closeFolderOrFile} create={create} /> : null}
        
    </div>
  );
}

export default App
