import './List.scss';


const List = () => {
    return (
        <div className='List'>
            <div className='List__Top'>
                <div className="List__Top__Left">
                    <p>Tất cả (7)</p>
                    <p>Công bố (7)</p>
                    <p>Không công bố (0)</p>
                </div>
                <div className="List__Top__Right">
                    <button className='List__Top__Right__Textbox' type="text" placeholder='Nhập thông tin tìm kiếm'/>
                    <button className='List__Top__Right__Button'>+ Viết bài</button>
                </div>
            </div>
            <div className='List__Item'>
                <div className='List__Item__Title'>
                    <p>Tiêu đề</p>
                    <p>Trạng thái</p>
                    <p>Thời gian hiển thị</p>
                </div>
                <div className='List__Item__Dashboard'>
                    <div className='List__Item__Dashboard__Articles'>
                        <p>Test</p>
                        <p>Hiển thị</p>
                        <p>-/-</p>
                    </div>
                    <div className='List__Item__Dashboard__Article'>
                        <p>Test</p>
                        <p>Hiển thị</p>
                        <p>-/-</p>
                    </div>
                    <div className='List__Item__Dashboard__Articles'>
                        <p>Test</p>
                        <p>Hiển thị</p>
                        <p>-/-</p>
                    </div>
                    <div className='List__Item__Dashboard__Article'>
                        <p>Test</p>
                        <p>Hiển thị</p>
                        <p>-/-</p>
                    </div>
                    <div className='List__Item__Dashboard__Articles'>
                        <p>Test</p>
                        <p>Hiển thị</p>
                        <p>-/-</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;