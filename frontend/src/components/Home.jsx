
import Modal from "@/modal/Modal";
import MainLayout from "./MainLayout";
import { useSelector } from "react-redux";


const Home = () => {
  const {isEditing}= useSelector(store=>store.task);
  return (
    <>
    <MainLayout/>
    {isEditing && <Modal/>}
    </>
  );
};

export default Home;
