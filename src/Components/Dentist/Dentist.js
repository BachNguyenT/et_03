import "./Dentist.scss";
import { Switch } from "antd";

const Dentist = () => {
  return (
    <div className="Dentist">
      <div className="Dentist__Top">
        <div className="Dentist__Top__Left">
          <p>Tất cả (7)</p>
          <p>Công bố (7)</p>
          <p>Không công bố (0)</p>
        </div>
        <div className="Dentist__Top__Right">
          <button
            className="Dentist__Top__Right__Textbox"
            type="text"
            placeholder="Nhập thông tin tìm kiếm"
          />
          <button className="Dentist__Top__Right__Button">+ Thêm bác sĩ</button>
        </div>
      </div>
      <div className="Dentist__Item">
        <div className="Dentist__Item__Title">
          <p>STT</p>
          <p>Tên tiêu đề</p>
          <p>Tên nha sĩ</p>
          <p>Trạng thái</p>
        </div>
      </div>
    </div>
  );
};

export default Dentist;
