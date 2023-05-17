import './Searchbar.scss';
// import { Icon } from 'antd';

const Searchbar = () => {

    return (
        <div className='Searchbar'>
            <div className='Searchbar__Search'>
                <h3 className='Searchbar__Search__Title'>Danh mục</h3>
                <input type='text' className='Searchbar__Search__Textbox' placeholder='Search by Name'></input>
            </div>
            <div className='Searchbar__List'>
                <button className='Searchbar__List__Item'>Blog</button>
                <button className='Searchbar__List__Item'>Sự kiện</button>

            </div>
            <div className='Searchbar__Icon'>

            </div>

        </div>
    )
}

export default Searchbar;