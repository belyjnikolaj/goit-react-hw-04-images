import css from './Button.module.css';

const Button = ({handlePageChange}) => {
    return (
        <button
            type="button"
            className={css.button}
            onClick={handlePageChange}
        >
            Load more
        </button>
    );    
}
 
export default Button;
