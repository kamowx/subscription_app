import { useState } from "react";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditShowModal] = useState(false);

  const [showPayModal, setShowPayModal] = useState(false);
  const [payDate, setPayDate] = useState("");
  const [payIndex, setPayIndex] = useState(null);

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

  // EDIT
  const [editName, setEditName] = useState("");
  const [editSum, setEditSum] = useState("");
  const [editWork, setEditWork] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editPeriod, setEditPeriod] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  function Edit(subscription) {
    const index = subscriptions.indexOf(subscription);

    setEditIndex(index);

    setEditName(subscription.name);
    setEditWork(subscription.work);
    setEditSum(subscription.sum);
    setEditDate(subscription.date);
    setEditPeriod(subscription.period);

    setEditShowModal(true);
  }

  function AddEditSubscripe() {
    let newData = [...subscriptions];

    newData[editIndex].name = editName;
    newData[editIndex].sum = editSum;
    newData[editIndex].date = editDate;
    newData[editIndex].work = editWork;
    newData[editIndex].period = editPeriod;

    localStorage.setItem("subscriptions", JSON.stringify(newData));

    setSubscriptions(newData);

    setEditShowModal(false);

    alert("Изменения сохранены!");
  }

  //Удаления
  function Remove(index) {
    const newData = subscriptions.filter((item, i) => i !== index);

    localStorage.setItem("subscriptions", JSON.stringify(newData));

    setSubscriptions(newData);
  }

  // Оплата подписки и смена даты
  function PaySubscription(index) {
    setPayIndex(index);
    setPayDate(subscriptions[index].date);
    setShowPayModal(true);
  }

  function SavePayDate() {
    if (payDate === "") {
      alert("Выберите дату");
      return;
    }

    let newData = [...subscriptions];

    newData[payIndex].date = payDate;

    localStorage.setItem("subscriptions", JSON.stringify(newData));

    setSubscriptions(newData);

    setShowPayModal(false);
    setPayDate("");
    setPayIndex(null);

    alert("Дата оплаты изменена!");
  }

  // Проверка даты оплаты
  function CheckDate(item) {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const [year, month, day] = item.date.split("-").map(Number);

    const nextDate = new Date(year, month - 1, day);

    if (item.period === "month") {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }

    if (item.period === "year") {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    }

    nextDate.setHours(0, 0, 0, 0);

    const difference = nextDate - today;

    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (today >= nextDate) {
      return {
        border: "border-danger",
        text: "Срок оплаты наступил",
        textColor: "text-danger",
        days: 0,
      };
    }

    return {
      border: "border-success",
      text: `Срок оплаты ещё не наступил. Осталось ${daysLeft} дней`,
      textColor: "text-success",
      days: daysLeft,
    };
  }

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="mb-4">
          <h2 className="mb-1">Мои подписки</h2>
          <p className="text-muted mb-0">Учёт личных подписок</p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card border h-100">
              <div className="card-body">
                <small className="text-muted">Всего подписок</small>

                <h3 className="mt-2 mb-0">{subscriptions.length}</h3>
              </div>
            </div>
          </div>

          {/* Общая сумма */}
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
          <a href="/history">
            <button className="btn btn-warning  ms-3">История</button>
          </a>
        </div>

        <div className="mb-3">
          <h4>Мои подписки</h4>
        </div>

        <div className="row g-3">
          {subscriptions.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div className="card border h-100 position-relative">
                <div className="position-absolute top-0 end-0 mt-2 me-2 d-flex gap-1 z-3">
                  <button
                    className="btn btn-sm btn-light border rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "32px",
                      height: "32px",
                    }}
                    title="Редактировать"
                    onClick={() => Edit(item)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "32px",
                      height: "32px",
                    }}
                    title="Удалить"
                    onClick={() => Remove(index)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>

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

                  <div
                    className={`border rounded p-2 mt-3 ${
                      CheckDate(item).border
                    }`}
                  >
                    <small className={CheckDate(item).textColor}>
                      {CheckDate(item).text}
                    </small>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0 pt-0">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => PaySubscription(index)}
                  >
                    Оплачено (сменить дату)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPayModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div
            className="modal d-block"
            tabIndex="-1"
            onClick={() => setShowPayModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Оплата подписки</h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowPayModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Новая дата оплаты</label>

                    <input
                      type="date"
                      className="form-control"
                      value={payDate}
                      onChange={(e) => setPayDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowPayModal(false)}
                  >
                    Отмена
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={SavePayDate}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showEditModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div
            className="modal d-block"
            tabIndex="-1"
            onClick={() => setEditShowModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Редактировать подписку</h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Название приложения</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Например: Netflix"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Стоимость подписки</label>

                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Введите сумму"
                      value={editSum}
                      onChange={(e) => setEditSum(e.target.value)}
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
                      onChange={(e) => setEditWork(e.target.value)}
                      value={editWork}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Период оплаты</label>

                    <select
                      className="form-select"
                      value={editPeriod}
                      onChange={(e) => setEditPeriod(e.target.value)}
                    >
                      <option value="month">За месяц</option>

                      <option value="year">За год</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Дата покупки</label>

                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={AddEditSubscripe}
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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
