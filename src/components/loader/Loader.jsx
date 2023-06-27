import React from "react";
import { ThreeDots } from "react-loader-spinner";
import css from './Loader.module.css'; 

const Loader = () => {
    return (
        <ThreeDots            
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName={css.loader}
            visible={true}
        />
    )
}
export default Loader;