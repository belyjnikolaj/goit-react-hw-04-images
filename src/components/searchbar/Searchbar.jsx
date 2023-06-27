import React, { useState } from "react";
import css from "./Searchbar.module.css";

const Searchbar = ({ handleSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <div className={css["button-label"]}>
            <div className={css.icon}></div>
          </div>
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={value}
        />
      </form>
    </header>
  );
};

export default Searchbar;

// class Searchbar extends Component {
//     state = { 
//         value:'', 
//     } 

//     handleChange = ({ target: { value } }) => {
//         this.setState({ value });
//     }

//     handleSubmit = (e) => {
//         e.preventDefault()
//         this.props.handleSearch(this.state.value);
//     }

//     render() { 
//         return (
//             <header className={css.searchbar}>
//                 <form className={css.form} onSubmit={this.handleSubmit}>
//                     <button type="submit" className={css.button}>
//                         <div className={css["button-label"]}>
//                             <div className={css.icon}></div>                         
//                         </div>
//                     </button>
//                     <input
//                         className={css.input}
//                         type="text"
//                         autoComplete="off"
//                         autoFocus
//                         placeholder="Search images and photos"
//                         onChange={this.handleChange}
//                         value={this.state.value}
//                     />
//                 </form>
//             </header>
//         );
//     }
// }
 
// export default Searchbar;

