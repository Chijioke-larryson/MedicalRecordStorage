import React from "react";
import "./navbar.css"; // Ensure your CSS is updated to match the new design
import healthReport from "../../assets/health-report.png";
import { loadAccount } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import Blockies from "react-blockies";
import config from "../../config.json";

const Navbar = () => {
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);
  const chainId = useSelector((state) => state.provider.chainId);

  const connectHandler = async () => {
    await loadAccount(provider, dispatch);
  };

  const networkHandler = async (e) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: e.target.value }],
    });
  };

  return (
    <div className="Navbar">
      <div className="nav__name">
        <img src={healthReport} alt="Health Report" width="40" height="40" />
        <h2>Larryson Hospital Medical Record</h2>
      </div>
      <div className="nav__networkSelector">
        <select
          name="network"
          id="network"
          onChange={networkHandler}
          value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
          className="network-select"
        >
          <option value="0" disabled>
            Select Network
          </option>
          <option value="0x7a69">Larryson Network</option>
          <option value="0xaa36a7">Sepolia</option>
        </select>
      </div>
      <div className="nav__balance">
        <p className="nav__myBalance">
          <small>My Balance: </small>
          {balance ? Number(balance).toFixed(4) : "0 ETH"}
        </p>
        {account ? (
          <a className="nav__myAccount" href="#">
            {account.slice(0, 5) + "...." + account.slice(38, 42)}
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="#2187D0"
              bgColor="#F1F2F9"
              spotColor="#767F92"
              className="identicon"
            />
          </a>
        ) : (
          <button className="nav__balance-box" onClick={connectHandler}>
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
