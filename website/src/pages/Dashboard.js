import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import '.././css/admindashboard.css'
function DashBoard() {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const [barChartInstance, setBarChartInstance] = useState(null);
  const [pieChartInstance, setPieChartInstance] = useState(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx && !barChartInstance) {
      const chartData = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Sales',
            data: [14, 23, 16],
            backgroundColor: ['blue', 'green', 'red'],
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });

      setBarChartInstance(newChartInstance);
    }

    return () => {
      if (barChartInstance) {
        barChartInstance.destroy();
        setBarChartInstance(null);
      }
    };
  }, [chartRef, barChartInstance]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx && !pieChartInstance) {
      const chartData = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
          {
            label: 'Sales',
            data: [14, 23, 16, 3, 26],
            backgroundColor: ['pink', 'blue', 'green', 'red', 'lightgray'],
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };

      const newChartInstance = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: chartOptions,
      });

      setPieChartInstance(newChartInstance);
    }

    return () => {
      if (pieChartInstance) {
        pieChartInstance.destroy();
        setPieChartInstance(null);
      }
    };
  }, [canvasRef, pieChartInstance]);

      
    
  return (
  <div className='dashboard'>
    <h2 style={{fontSize:"1.5rem",fontWeight:"bold",marginBottom:"10px"}}>DashBoard</h2>
    <div className="grid gap-2 mb-8 xl:grid-cols-5 md:grid-cols-2" >
        
      <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full">
        <div className="p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-emerald-100 bg-teal-600">
          <div className="text-center xl:mb-0 mb-3">
            <div className="text-center inline-block text-3xl text-white dark:text-emerald-100 bg-teal-600">
              {/* Include your SVG icon here */}
            </div>
            <div>
              <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">Today Orders</p>
              <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">$1269.99</p>
            </div>
            <div className="flex text-center text-xs font-normal text-gray-50 dark:text-gray-100">
              <div className="px-1 mt-3">Cash : $1269.99</div>
              <div className="px-1 mt-3">Card : $0.00</div>
              <div className="px-1 mt-3">Credit : $0.00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full">
  <div className="p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-orange-100 bg-orange-400">
    <div className="text-center xl:mb-0 mb-3">
      <div className="text-center inline-block text-3xl text-white dark:text-orange-100 bg-orange-400">
        {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 5l-8-4-8 4 8 4 8-4zM8 2.328l5.345 2.672-5.345 2.672-5.345-2.672 5.345-2.672zM14.398 7.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199zM14.398 10.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199z"></path>
        </svg> */}
      </div>
      <div>
        <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">Yesterday Orders</p>
        <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">$39860.00</p>
      </div>
      <div className="flex text-center text-xs font-normal text-gray-50 dark:text-gray-100">
        <div className="px-1 mt-3">Cash : $0.00</div>
        <div className="px-1 mt-3">Card : $0.00</div>
        <div className="px-1 mt-3">Credit : $0.00</div>
      </div>
    </div>
  </div>
</div>

      
 <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full">
      <div className="p-4 border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-teal-100 bg-cyan-600">
        <div className="text-center inline-block text-3xl text-white dark:text-teal-100 bg-cyan-600">
          {/* <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
          </svg> */}
        </div>
        <div>
          <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">This Month</p>
          <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">$151990.59</p>
        </div>
      </div>
    </div>

    <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full">
      <div className="p-4 border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-emerald-100 bg-blue-500">
        <div className="text-center inline-block text-3xl text-white dark:text-emerald-100 bg-blue-500">
          {/* <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg> */}
        </div>
        <div>
          <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">Last Month</p>
          <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">$721463.02</p>
        </div>
      </div>
    </div>

      <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full">
      <div className="p-4 border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-emerald-100 bg-emerald-600">
        <div className="text-center inline-block text-3xl text-white dark:text-emerald-100 bg-emerald-600">
          {/* <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z"></path>
          </svg> */}
        </div>
        <div>
          <p className="mb-3 text-base font-medium text-gray-50 dark:text-gray-100">All-Time Sales</p>
          <p className="text-2xl font-bold leading-none text-gray-50 dark:text-gray-50">$454894.22</p>
        </div>
      </div>
    </div>
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex h-full">
        <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
          <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500">
            {/* <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg> */}
          </div>
          <div>
            <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
              <span>Total Order</span>
            </h6>
            <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">525</p>
          </div>
        </div>
      </div>
        

      <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex h-full">
      <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
        <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500">
          {/* <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg> */}
        </div>
        <div>
          <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
            <span>Orders Pending</span>
            <span className="text-red-500 text-sm font-semibold">(110216.15)</span>
          </h6>
          <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">165</p>
        </div>
      </div>
    </div>

    <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex h-full">
      <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
        <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500">
          {/* <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg> */}
        </div>
        <div>
          <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
            <span>Orders Processing</span>
          </h6>
          <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">42</p>
        </div>
      </div>
    </div>

    <div className="min-w-0 rounded-lg overflow-hidden bg-white dark:bg-gray-800 flex h-full">
      <div className="p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg">
        <div className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-emerald-600 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-500">
        {/* <svg>
  <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />
</svg> */}

        </div>
        <div>
          <h6 className="text-sm mb-1 font-medium text-gray-600 dark:text-gray-400">
            <span>Orders Delivered</span>
          </h6>
          <p className="text-2xl font-bold leading-none text-gray-600 dark:text-gray-200">303</p>
        </div>
      </div>
    </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2 my-8" style={{height:"100px"}}>
          
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">Weekly Sales</p>
                    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
                        <ul className="flex flex-wrap -mb-px">
                            <li className="mr-2">
                                <button type="button" className="inline-block p-2 rounded-t-lg border-b-2 border-transparent text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500 focus:outline-none">
                                    Sales
                                </button>
                            </li>
                            <li className="mr-2">
                                <button type="button" className="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 focus:outline-none">
                                    Orders
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="chart-container" style={{ height: "300px" }}>
                        <canvas ref={chartRef} height="300" width="500"></canvas>
                    </div>
                </div>

        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">Best Selling Products</p>
        

               <div className="chart-container" style={{ height: "300px" }}>
                        <canvas ref={canvasRef} height="300" width="500"></canvas>
                    </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
