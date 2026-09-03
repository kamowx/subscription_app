import { useState } from "react";

function Home() {
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [sum, setSum] = useState("");
  const [work, setWork] = useState("");
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("month");

  const [subscriptions, setSubscriptions] = useState(
    JSON.parse(localStorage.getItem("subscriptions")) || [],
  );

  function AddSubscripe() {
    if (name === "" || sum === "" || work === "" || date === "") {
      alert("Заполните все поля");
      return;
    }

    const newSubscription = {
      name: name,
      sum: sum,
      work: work,
      date: date,
      period: period,
    };

    const oldSubscriptions = [...subscriptions];

    oldSubscriptions.push(newSubscription);

    localStorage.setItem("subscriptions", JSON.stringify(oldSubscriptions));

    setSubscriptions(oldSubscriptions);

    setName("");
    setSum("");
    setWork("");
    setDate("");
    setPeriod("month");

    setShowModal(false);
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="mb-4">
          <h2 className="mb-1">Мои подписки</h2>
          <p className="text-muted mb-0">Учёт личных подписок</p>
        </div>

        <div className="row g-3 mb-4">
          {/* Всего подписок */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card border h-100">
              <div className="card-body">
                <small className="text-muted">Всего подписок</small>

                <h3 className="mt-2 mb-0">{subscriptions.length}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card border h-100">
              <div className="card-body">
                <small className="text-muted">Общая сумма</small>

                <h3 className="mt-2 mb-0">
                  $
                  {subscriptions
                    .reduce((total, item) => total + Number(item.sum), 0)
                    .toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="card border h-100">
              <div className="card-body">
                <small className="text-muted">За месяц</small>

                <h3 className="mt-2 mb-0">
                  $
                  {subscriptions
                    .reduce((total, item) => {
                      if (item.period === "month") {
                        return total + Number(item.sum);
                      }

                      if (item.period === "year") {
                        return total + Number(item.sum) / 12;
                      }

                      return total;
                    }, 0)
                    .toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="card border h-100">
              <div className="card-body">
                <small className="text-muted">За год</small>

                <h3 className="mt-2 mb-0">
                  $
                  {subscriptions
                    .reduce((total, item) => {
                      if (item.period === "month") {
                        return total + Number(item.sum) * 12;
                      }

                      if (item.period === "year") {
                        return total + Number(item.sum);
                      }

                      return total;
                    }, 0)
                    .toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Добавить подписку
          </button>
        </div>

        <div className="mb-3">
          <h4>Мои подписки</h4>
        </div>

        <div className="row g-3">
          {subscriptions.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className="card border h-100">
                <div className="card-body">
                  <h5 className="mb-3">{item.name}</h5>

                  <h4 className="mb-2">
                    ${item.sum}
                    <small className="text-muted fs-6">
                      {item.period === "month" ? " / месяц" : " / год"}
                    </small>
                  </h4>

                  <p className="mb-2">{item.work}</p>

                  <small className="text-muted">Куплено: {item.date}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div
            className="modal d-block"
            tabIndex="-1"
            onClick={() => setShowModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Добавить подписку</h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Название приложения</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Например: Netflix"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Стоимость подписки</label>

                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Введите сумму"
                      value={sum}
                      onChange={(e) => setSum(e.target.value)}
                    />

                    <select className="form-select">
                      <option value="USD">USD — $</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Для чего</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Например: фильмы, музыка, игры, работа"
                      onChange={(e) => setWork(e.target.value)}
                      value={work}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Период оплаты</label>

                    <select
                      className="form-select"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                    >
                      <option value="month">За месяц</option>
                      <option value="year">За год</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Дата покупки</label>

                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={AddSubscripe}
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
