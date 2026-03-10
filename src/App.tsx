import React, { useState, useMemo } from 'react';
import { Plus, Search, X, Bell, Globe, Share2, DollarSign, Truck, Calendar, ChevronDown, MoreVertical, AlertCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES, MOCK_ITEMS } from './constants';

interface Item {
  id: string;
  title: string;
  price: number;
  type: string;
  image: string;
  quantity?: number;
}

const AddItemModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (item: Item) => void }) => {
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.id.includes(search)
    );
  }, [search]);

  const handleQtyChange = (id: string, val: string) => {
    const num = parseInt(val) || 1;
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        <div className="p-4 border-bottom flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Add item</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-bottom">
          <label className="text-sm text-gray-500 mb-1 block">Search</label>
          <div className="relative">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#26C2B9] focus:border-transparent"
              placeholder=""
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {search ? (
                <X size={18} className="cursor-pointer" onClick={() => setSearch('')} />
              ) : (
                <Search size={18} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.map(item => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-3 flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded" referrerPolicy="no-referrer" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.price} | {item.type}</p>
                <p className="text-xs text-gray-400">{item.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Qty</span>
                  <input 
                    type="number"
                    min="1"
                    value={quantities[item.id] || 1}
                    onChange={(e) => handleQtyChange(item.id, e.target.value)}
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-[#26C2B9]"
                  />
                </div>
                <button 
                  onClick={() => onAdd({ ...item, quantity: quantities[item.id] || 1 })}
                  className="bg-[#26C2B9] text-white px-4 py-2 rounded font-medium hover:bg-[#1fa9a1] transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">No items found</div>
          )}
        </div>

        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [salesChannel, setSalesChannel] = useState('France');
  const [destinationType, setDestinationType] = useState('address');
  const [country, setCountry] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (method: string) => {
    setExpandedRows(prev => 
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    );
  };

  const handleAddItem = (item: Item) => {
    setSelectedItems(prev => [...prev, item]);
    setIsModalOpen(false);
  };

  const removeItem = (id: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-900">
      <div className="max-w-[98%] mx-auto px-2 py-4 md:px-4 space-y-6">
        
        {/* Item Section */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Item</h2>
          <div className="flex flex-wrap gap-4">
            {selectedItems.map(item => (
              <div key={item.id} className="relative bg-white border border-gray-200 rounded-lg p-4 w-40 flex flex-col items-center text-center shadow-sm">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                >
                  <X size={12} />
                </button>
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain mb-2" referrerPolicy="no-referrer" />
                <p className="text-xs font-medium text-gray-800 line-clamp-2">{item.title}</p>
                <p className="text-[10px] text-gray-400 mt-1">Qty: {item.quantity}</p>
              </div>
            ))}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-4 w-40 h-40 flex flex-col items-center justify-center gap-2 hover:border-[#26C2B9] hover:bg-gray-50 transition-all group"
            >
              <div className="bg-gray-100 p-3 rounded-full group-hover:bg-[#26C2B9]/10 transition-colors">
                <Plus size={32} className="text-gray-400 group-hover:text-[#26C2B9]" />
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-[#26C2B9]">Add an item</span>
            </button>
          </div>
        </section>

        {/* Options Section */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Options</h2>
          
          {/* Sales Channel */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex gap-4">
            <div className="bg-[#26C2B9]/10 p-3 rounded-full h-fit">
              <Share2 size={20} className="text-[#26C2B9]" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-800">Sales Channel</h3>
                <p className="text-sm text-gray-500">Specify the sales channel to use</p>
              </div>
              <div className="max-w-xs">
                <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Sales channels</label>
                <div className="relative">
                  <select 
                    value={salesChannel}
                    onChange={(e) => setSalesChannel(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#26C2B9] focus:border-transparent text-sm"
                  >
                    <option>France</option>
                    <option>Germany</option>
                    <option>Italy</option>
                    <option>Poland</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex gap-4">
            <div className="bg-[#26C2B9]/10 p-3 rounded-full h-fit">
              <Globe size={20} className="text-[#26C2B9]" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Destination</h3>
                <p className="text-sm text-gray-500">Specify the destination</p>
              </div>
              
              <div className="space-y-3">
                {/* Address Option */}
                <div className={`border rounded-lg p-4 transition-colors ${destinationType === 'address' ? 'border-[#26C2B9] bg-[#26C2B9]/5' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer mb-4">
                    <input 
                      type="radio" 
                      name="dest" 
                      checked={destinationType === 'address'} 
                      onChange={() => setDestinationType('address')}
                      className="w-4 h-4 accent-[#26C2B9]"
                    />
                    <span className="text-sm font-medium">Address</span>
                  </label>
                  
                  {destinationType === 'address' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-7">
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Country</label>
                        <div className="relative">
                          <select 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#26C2B9] text-sm"
                          >
                            <option value="">Select a country</option>
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Zip code (optional)</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#26C2B9] text-sm" />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Region (optional)</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#26C2B9] text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">Timezone (required if set in destination zone)</label>
                        <div className="relative">
                          <select className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#26C2B9] text-sm">
                            <option>Select a timezone</option>
                            <option>UTC+01:00 (Paris)</option>
                            <option>UTC+00:00 (London)</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Zone Option */}
                <div className={`border rounded-lg p-4 transition-colors ${destinationType === 'zone' ? 'border-[#26C2B9] bg-[#26C2B9]/5' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="dest" 
                      checked={destinationType === 'zone'} 
                      onChange={() => setDestinationType('zone')}
                      className="w-4 h-4 accent-[#26C2B9]"
                    />
                    <span className="text-sm font-medium">Zone</span>
                  </label>
                </div>

                {/* Stock Location Option */}
                <div className={`border rounded-lg p-4 transition-colors ${destinationType === 'stock' ? 'border-[#26C2B9] bg-[#26C2B9]/5' : 'border-gray-200'}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="dest" 
                      checked={destinationType === 'stock'} 
                      onChange={() => setDestinationType('stock')}
                      className="w-4 h-4 accent-[#26C2B9]"
                    />
                    <span className="text-sm font-medium">Stock location</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Other Options (Price, Delivery, Date) */}
          {[
            { icon: DollarSign, title: 'Order price', desc: 'Modify the order price' },
            { icon: DollarSign, title: 'Order price', desc: 'Modify the order price' },
            { icon: Truck, title: 'Delivery method', desc: 'Limit the test to one or multiple delivery methods' },
            { icon: Calendar, title: 'Date and time', desc: 'Simulate a test at a given date and time in the future' },
          ].map((opt, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <opt.icon size={20} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{opt.title}</h3>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </div>
              <button className="border border-gray-300 text-gray-700 px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                Add
              </button>
            </div>
          ))}
        </section>

        {/* Action Button */}
        <div className="flex justify-center pt-8">
          <button 
            onClick={() => setShowResults(true)}
            className="bg-[#26C2B9] text-white px-12 py-3 rounded-full font-bold shadow-lg shadow-[#26C2B9]/30 hover:bg-[#1fa9a1] transition-all transform hover:scale-105 active:scale-95"
          >
            Test the delivery promise
          </button>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-8 border-t border-gray-200"
            >
              {/* Result Badges */}
              <div className="flex flex-wrap gap-2">
                {selectedItems.map(item => (
                  <span key={item.id} className="bg-[#26C2B9]/10 text-[#26C2B9] px-3 py-1 rounded text-xs font-semibold border border-[#26C2B9]/20">
                    {item.id}
                  </span>
                ))}
                <span className="bg-[#26C2B9]/10 text-[#26C2B9] px-3 py-1 rounded text-xs font-semibold border border-[#26C2B9]/20">
                  {salesChannel}
                </span>
                <span className="bg-[#26C2B9]/10 text-[#26C2B9] px-3 py-1 rounded text-xs font-semibold border border-[#26C2B9]/20">
                  Address : {country || 'Germany'}
                </span>
              </div>

              {/* Result Table */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 flex justify-end items-center gap-2 text-xs text-gray-500">
                  <span>1 - 2 out of 2</span>
                  <button className="hover:bg-gray-100 p-1 rounded">
                    <MoreVertical size={16} />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-y border-gray-100 text-gray-400 font-medium">
                        <th className="px-4 py-3 font-medium w-10"></th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Delivery method <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Status <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Reason <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Delivery date (start of delivery slot) <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Delivery date <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Promise cut-off <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Number of shipments <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Transportation cost <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Carbon footprint <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Shipping fees <ChevronDown size={12} />
                          </div>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-1">
                            Carrier <ChevronDown size={12} />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      {[
                        { name: 'Standard', status: 'Valid', reason: 'Success', dateStart: '11/03/2026 17:00', dateEnd: '12/03/2026 19:00', cutoff: '10/03/2026 16:00', shipments: 1, cost: '5.90€', carbon: '150g', fees: '4.99€', carrier: 'DHL' },
                        { name: 'Express', status: 'Valid', reason: 'Success', dateStart: '10/03/2026 18:00', dateEnd: '11/03/2026 10:00', cutoff: '10/03/2026 14:00', shipments: 1, cost: '12.50€', carbon: '220g', fees: '9.99€', carrier: 'FedEx' },
                      ].map((method) => (
                        <React.Fragment key={method.name}>
                          <tr 
                            className={`hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer ${expandedRows.includes(method.name) ? 'bg-gray-50' : ''}`}
                            onClick={() => toggleRow(method.name)}
                          >
                            <td className="px-4 py-4">
                              <ChevronRight 
                                size={16} 
                                className={`transition-transform ${expandedRows.includes(method.name) ? 'rotate-90' : ''}`} 
                              />
                            </td>
                            <td className="px-4 py-4 font-medium">{method.name}</td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1">
                                <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-500/10" />
                                <span className="text-emerald-600 font-medium">{method.status}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-gray-400">{method.reason}</td>
                            <td className="px-4 py-4 text-center">{method.dateStart}</td>
                            <td className="px-4 py-4 text-center">{method.dateEnd}</td>
                            <td className="px-4 py-4 text-center font-mono">{method.cutoff}</td>
                            <td className="px-4 py-4 text-center">{method.shipments}</td>
                            <td className="px-4 py-4 text-center font-medium">{method.cost}</td>
                            <td className="px-4 py-4 text-center text-gray-400">{method.carbon}</td>
                            <td className="px-4 py-4 text-center">{method.fees}</td>
                            <td className="px-4 py-4 text-center">
                              <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{method.carrier}</span>
                            </td>
                          </tr>
                          {expandedRows.includes(method.name) && (
                            <tr className="bg-gray-50/50">
                              <td colSpan={12} className="px-8 py-4">
                                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                                  <table className="w-full text-left text-[10px]">
                                    <thead>
                                      <tr className="bg-gray-50 text-gray-400 border-b border-gray-100">
                                        <th className="px-4 py-2 font-medium">Article ID</th>
                                        <th className="px-4 py-2 font-medium">Quantity</th>
                                        <th className="px-4 py-2 font-medium">Supplier</th>
                                        <th className="px-4 py-2 font-medium">Purchase price</th>
                                        <th className="px-4 py-2 font-medium">Shipping cost</th>
                                        <th className="px-4 py-2 font-medium">Delivery date</th>
                                        <th className="px-4 py-2 font-medium">Carrier</th>
                                        <th className="px-4 py-2 font-medium">Consolidation place</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedItems.length > 0 ? (
                                        selectedItems.map((item, index) => (
                                          <tr key={item.id} className="border-b border-gray-50 last:border-0">
                                            <td className="px-4 py-2 font-medium text-gray-700">{item.id}</td>
                                            <td className="px-4 py-2 font-medium text-gray-700">{item.quantity}</td>
                                            <td className="px-4 py-2">Warehouse A</td>
                                            <td className="px-4 py-2">{item.price.toFixed(2)} €</td>
                                            <td className="px-4 py-2">{(method.cost)}</td>
                                            <td className="px-4 py-2">{method.dateStart}</td>
                                            <td className="px-4 py-2">
                                              {index % 2 === 0 ? (
                                                <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase">{method.carrier}</span>
                                              ) : (
                                                <span className="text-gray-300">-</span>
                                              )}
                                            </td>
                                            <td className="px-4 py-2">
                                              {index % 2 !== 0 ? "Hub Paris" : <span className="text-gray-300">-</span>}
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr>
                                          <td colSpan={8} className="px-4 py-4 text-center text-gray-400">No items selected</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 flex justify-end items-center gap-2 text-xs text-gray-500 border-t border-gray-100">
                  <span>1 - 2 out of 2</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Notification Bell */}
      <button className="fixed bottom-6 right-6 bg-[#26C2B9] text-white p-4 rounded-full shadow-xl hover:bg-[#1fa9a1] transition-all transform hover:scale-110">
        <Bell size={24} />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddItemModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onAdd={handleAddItem} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
