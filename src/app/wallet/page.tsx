'use server'

import {listWallets} from "@/api/api";

export default async function Page() {

  const list = await listWallets()


  // await new Promise(resolve => setTimeout(resolve, 5000));
  return (
    <>
      <div className="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Wallets</h5>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {list.result.map((wallet, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z"></path><path d="M8.5 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM17 13.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {wallet}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}