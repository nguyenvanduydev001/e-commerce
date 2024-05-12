import React from 'react';

const Services = () => {
    return (
        <div>

            {/* Phần Services với hình ảnh và chữ */}
            <div className="w-main bg-white py-6">
                <div className="w-full mx-auto ">
                    <div className="w-full col-span-2">
                        <div className="overflow-hidden mb-6 flex ">
                            <div className="w-1/2">
                                <img src="https://cdn.shopify.com/s/files/1/1636/8779/files/9069783_orig.jpg?v=1491836163" alt="Blog" className="w-full  object-cover object-center h-full" />
                            </div>
                            <div className="w-1/2 p-6">
                                <p className="text-gray-600">Cras magna tellus, congue vitae congue vel, facilisis id risus. Proin semper in lectus id faucibus. Aenean vitae quam eget mi aliquam viverra quis quis velit.

                                    Curabitur mauris diam, posuere vitae nunc eget, blandit pellentesque mi. Pellentesque placerat nulla at ultricies malesuada. Aenean mi lacus, malesuada at leo vel, blandit iaculis nisl.

                                    Praesent vestibulum nisl sed diam euismod, a auctor neque porta. Vestibulum varius ligula non orci tincidunt rutrum. Suspendisse placerat enim eu est egestas, aliquam venenatis elit accumsan. Donec metus quam, posuere sit amet odio et, ultricies consequat nibh.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần các biểu tượng và chữ */}
            <div className="w-main bg-white pt-4 pb-12">
                <div className="w-full mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">We Offer Best Services</h2>
                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {/* Icon 1 */}
                        <div className="flex items-center justify-center flex-col gap-2">
                            <img src="https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711" alt="Icon 1" className="w-16 h-16 mb-2" />
                            <p className="text-lg font-normal text-gray-800">Customizable Page</p>
                            <p className="text-sm font-normal text-gray-800 text-center">
                                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
                            </p>
                        </div>

                        {/* Icon 2 */}
                        <div className="flex items-center justify-center flex-col gap-2">
                            <img src="https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656" alt="Icon 2" className="w-16 h-16 mb-2" />
                            <p className="text-lg font-normal text-gray-800">Revolution Slider</p>
                            <p className="text-sm font-normal text-gray-800 text-center">
                                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
                            </p>
                        </div>
                        {/* Icon 3 */}
                        <div className="flex items-center justify-center flex-col gap-2">
                            <img src="https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677" alt="Icon 3" className="w-16 h-16 mb-2" />
                            <p className="text-lg font-normal text-gray-800">Drag & Drop Page</p>
                            <p className="text-sm font-normal text-gray-800 text-center">
                                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
                        {/* Icon 4 */}
                        <div className="flex items-center justify-center flex-col gap-2">
                            <img src="https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656" alt="Icon 4" className="w-16 h-16 mb-2" />
                            <p className="text-lg font-normal text-gray-800">Revolution Slider</p>
                            <p className="text-sm font-normal text-gray-800 text-center">
                                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
                            </p>
                        </div>
                        {/* Icon 5 */}
                        <div className="flex items-center justify-center flex-col gap-2">
                            <img src="https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677" alt="Icon 5" className="w-16 h-16 mb-2" />
                            <p className="text-lg font-normal text-gray-800">Drag & Drop Page</p>
                            <p className="text-sm font-normal text-gray-800 text-center">
                                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
                            </p>
                        </div>
                        {/* Icon 6 */}
                        <div className="flex items-center justify-center flex-col gap-2">
                            <img src="https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711" alt="Icon 6" className="w-16 h-16 mb-2" />
                            <p className="text-lg font-normal text-gray-800">Customizable Page</p>
                            <p className="text-sm font-normal text-gray-800 text-center">
                                Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Services;
