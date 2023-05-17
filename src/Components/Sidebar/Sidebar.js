import './Sidebar.scss';


const Sidebar = () => {
    return (
        <div className='Sidebar'>
            <div className='Sidebar__Upper'>
                <button className='Sidebar__Upper__Button'>1</button>
                <button className='Sidebar__Upper__Button'>2</button>
                <button className='Sidebar__Upper__Button'>3</button>
                <button className='Sidebar__Upper__Button'>4</button>
                <button className='Sidebar__Upper__Button'>5</button>
                <button className='Sidebar__Upper__Button'>6</button>
            </div>
            <div className='Sidebar__Lower'>
                <button className='Sidebar__Lower__Button'>1</button>
            </div>
        </div>
    )
}

export default Sidebar;