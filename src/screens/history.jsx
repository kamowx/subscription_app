import { useState } from "react";

function History() {
  const [subscriptions] = useState(
    JSON.parse(localStorage.getItem("subscriptions")) || [],
  );

  return (
    <div className="container mt-5 text-center">
      <div className="card p-5">
        <h2>История</h2>

        {subscriptions.length === 0 ? (
          <h1>
            <b>Пока что нет</b>
          </h1>
        ) : (
          subscriptions.map((item, index) => (
            <div className="card p-3 mt-3" key={index}>
              <h4>{item.name}</h4>

              <p>Сумма: ${item.sum}</p>

              <p>Для чего: {item.work}</p>

              <p>Дата оплаты: {item.date}</p>

              <p>Период: {item.period === "month" ? "За месяц" : "За год"}</p>
            </div>
          ))
        )}

        <br />

        <a href="/">
          <button className="btn btn-danger">Назад</button>
        </a>
      </div>
    </div>
  );
}

export default History;
