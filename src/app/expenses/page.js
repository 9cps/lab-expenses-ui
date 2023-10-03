"use client";
import React from 'react'
import { useParams, useRouter } from 'next/navigation'

function ExpensesDetail() {
    const router = useRouter();
    console.log("router", router);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
                <div className="flex items-center h-full">
                    <img className='w-11 h-11 mr-2' src="https://daisyui.com/images/emoji/yawning-face@80.webp" /> <h1 className='text-2xl font-bold'>View Statement</h1>
                </div>

                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <button className="btn w-64 rounded-full" onClick={() => router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
                        Back
                    </button>
                </div>
            </div>

            <div className="relative flex place-items-center">
                <div className="overflow-x-auto  max-h-[350px] overflow-y-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>company</th>
                                <th>location</th>
                                <th>Last Login</th>
                                <th>Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Littel, Schaden and Vandervort</td>
                                <td>Canada</td>
                                <td>12/16/2020</td>
                                <td>Blue</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Zemlak, Daniel and Leannon</td>
                                <td>United States</td>
                                <td>12/5/2020</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>Brice Swyre</td>
                                <td>Tax Accountant</td>
                                <td>Carroll Group</td>
                                <td>China</td>
                                <td>8/15/2020</td>
                                <td>Red</td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>Marjy Ferencz</td>
                                <td>Office Assistant I</td>
                                <td>Rowe-Schoen</td>
                                <td>Russia</td>
                                <td>3/25/2021</td>
                                <td>Crimson</td>
                            </tr>
                            <tr>
                                <th>5</th>
                                <td>Yancy Tear</td>
                                <td>Community Outreach Specialist</td>
                                <td>Wyman-Ledner</td>
                                <td>Brazil</td>
                                <td>5/22/2020</td>
                                <td>Indigo</td>
                            </tr>
                            <tr>
                                <th>6</th>
                                <td>Irma Vasilik</td>
                                <td>Editor</td>
                                <td>Wiza, Bins and Emard</td>
                                <td>Venezuela</td>
                                <td>12/8/2020</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>7</th>
                                <td>Meghann Durtnal</td>
                                <td>Staff Accountant IV</td>
                                <td>Schuster-Schimmel</td>
                                <td>Philippines</td>
                                <td>2/17/2021</td>
                                <td>Yellow</td>
                            </tr>
                            <tr>
                                <th>8</th>
                                <td>Sammy Seston</td>
                                <td>Accountant I</td>
                                <td>O'Hara, Welch and Keebler</td>
                                <td>Indonesia</td>
                                <td>5/23/2020</td>
                                <td>Crimson</td>
                            </tr>
                            <tr>
                                <th>9</th>
                                <td>Lesya Tinham</td>
                                <td>Safety Technician IV</td>
                                <td>Turner-Kuhlman</td>
                                <td>Philippines</td>
                                <td>2/21/2021</td>
                                <td>Maroon</td>
                            </tr>
                            <tr>
                                <th>10</th>
                                <td>Zaneta Tewkesbury</td>
                                <td>VP Marketing</td>
                                <td>Sauer LLC</td>
                                <td>Chad</td>
                                <td>6/23/2020</td>
                                <td>Green</td>
                            </tr>
                            <tr>
                                <th>11</th>
                                <td>Andy Tipple</td>
                                <td>Librarian</td>
                                <td>Hilpert Group</td>
                                <td>Poland</td>
                                <td>7/9/2020</td>
                                <td>Indigo</td>
                            </tr>
                            <tr>
                                <th>12</th>
                                <td>Sophi Biles</td>
                                <td>Recruiting Manager</td>
                                <td>Gutmann Inc</td>
                                <td>Indonesia</td>
                                <td>2/12/2021</td>
                                <td>Maroon</td>
                            </tr>
                            <tr>
                                <th>13</th>
                                <td>Florida Garces</td>
                                <td>Web Developer IV</td>
                                <td>Gaylord, Pacocha and Baumbach</td>
                                <td>Poland</td>
                                <td>5/31/2020</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>14</th>
                                <td>Maribeth Popping</td>
                                <td>Analyst Programmer</td>
                                <td>Deckow-Pouros</td>
                                <td>Portugal</td>
                                <td>4/27/2021</td>
                                <td>Aquamarine</td>
                            </tr>
                            <tr>
                                <th>15</th>
                                <td>Moritz Dryburgh</td>
                                <td>Dental Hygienist</td>
                                <td>Schiller, Cole and Hackett</td>
                                <td>Sri Lanka</td>
                                <td>8/8/2020</td>
                                <td>Crimson</td>
                            </tr>
                            <tr>
                                <th>16</th>
                                <td>Reid Semiras</td>
                                <td>Teacher</td>
                                <td>Sporer, Sipes and Rogahn</td>
                                <td>Poland</td>
                                <td>7/30/2020</td>
                                <td>Green</td>
                            </tr>
                            <tr>
                                <th>17</th>
                                <td>Alec Lethby</td>
                                <td>Teacher</td>
                                <td>Reichel, Glover and Hamill</td>
                                <td>China</td>
                                <td>2/28/2021</td>
                                <td>Khaki</td>
                            </tr>
                            <tr>
                                <th>18</th>
                                <td>Aland Wilber</td>
                                <td>Quality Control Specialist</td>
                                <td>Kshlerin, Rogahn and Swaniawski</td>
                                <td>Czech Republic</td>
                                <td>9/29/2020</td>
                                <td>Purple</td>
                            </tr>
                            <tr>
                                <th>19</th>
                                <td>Teddie Duerden</td>
                                <td>Staff Accountant III</td>
                                <td>Pouros, Ullrich and Windler</td>
                                <td>France</td>
                                <td>10/27/2020</td>
                                <td>Aquamarine</td>
                            </tr>
                            <tr>
                                <th>20</th>
                                <td>Lorelei Blackstone</td>
                                <td>Data Coordiator</td>
                                <td>Witting, Kutch and Greenfelder</td>
                                <td>Kazakhstan</td>
                                <td>6/3/2020</td>
                                <td>Red</td>
                            </tr>
                            <tr>
                                <th>21</th>
                                <td>Teddie Duerden</td>
                                <td>Staff Accountant III</td>
                                <td>Pouros, Ullrich and Windler</td>
                                <td>France</td>
                                <td>10/27/2020</td>
                                <td>Aquamarine</td>
                            </tr>
                            <tr>
                                <th>22</th>
                                <td>Lorelei Blackstone</td>
                                <td>Data Coordiator</td>
                                <td>Witting, Kutch and Greenfelder</td>
                                <td>Kazakhstan</td>
                                <td>6/3/2020</td>
                                <td>Red</td>
                            </tr>
                            <tr>
                                <th>23</th>
                                <td>Teddie Duerden</td>
                                <td>Staff Accountant III</td>
                                <td>Pouros, Ullrich and Windler</td>
                                <td>France</td>
                                <td>10/27/2020</td>
                                <td>Aquamarine</td>
                            </tr>
                            <tr>
                                <th>24</th>
                                <td>Lorelei Blackstone</td>
                                <td>Data Coordiator</td>
                                <td>Witting, Kutch and Greenfelder</td>
                                <td>Kazakhstan</td>
                                <td>6/3/2020</td>
                                <td>Red</td>
                            </tr>
                            <tr>
                                <th>25</th>
                                <td>Teddie Duerden</td>
                                <td>Staff Accountant III</td>
                                <td>Pouros, Ullrich and Windler</td>
                                <td>France</td>
                                <td>10/27/2020</td>
                                <td>Aquamarine</td>
                            </tr>
                            <tr>
                                <th>26</th>
                                <td>Lorelei Blackstone</td>
                                <td>Data Coordiator</td>
                                <td>Witting, Kutch and Greenfelder</td>
                                <td>Kazakhstan</td>
                                <td>6/3/2020</td>
                                <td>Red</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left space-x-2">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#63e6be" height="1em" viewBox="0 0 512 512" className="inline-block w-8 h-8 stroke-current"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                        </div>
                        <div className="stat-title">Total balance</div>
                        <div className="stat-value">42,009</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#63e6be" height="1em" viewBox="0 0 576 512" className="inline-block w-8 h-8 stroke-current"><path d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM128 416H64V352c35.3 0 64 28.7 64 64zM64 224V160h64c0 35.3-28.7 64-64 64zM448 352c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM384 256c0 61.9-43 112-96 112s-96-50.1-96-112s43-112 96-112s96 50.1 96 112zM252 208c0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h24 24c11 0 20-9 20-20s-9-20-20-20h-4V208c0-11-9-20-20-20H272c-11 0-20 9-20 20z" /></svg>
                        </div>
                        <div className="stat-title">Total spending this month</div>
                        <div className="stat-value">11,279</div>
                        <div className="stat-desc">5% more than last month</div>
                    </div>

                </div>

                <a
                    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Export{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Survey your statement
                    </p>
                </a>
            </div>
        </main>
    )
}

export default ExpensesDetail