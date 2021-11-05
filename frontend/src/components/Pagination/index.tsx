import { SalePage } from "Types/Sale";

type Props = {
    page: SalePage;
    onPageChange : Function;
}


 function Pagination({page, onPageChange} : Props) {
  return (
    <div>
      <div className="row d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${page.first ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(page.number - 1)}>Anterior</button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">{page.number + 1}</span>
            </li>
            <li className={`page-item ${page.last ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(page.number + 1)}>Próxima</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Pagination;
