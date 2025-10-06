import React from 'react';
import { ChevronDown, Phone } from 'lucide-react';

export default function ECommerceSite() {
  const pricingPlans = [
    {
      name: 'Grow',
      description: 'E-Ticarette hızla büyüyün.',
      price: '3.329',
      oldPrice: '49.908',
      yearlyPrice: '39.948',
      monthlyLabel: '/ay +KDV',
      yearlyLabel: '/yıl +KDV',
      features: [
        '69.90 TL\'den Başlayan Anlaşmalı Kargo Fiyatları',
        '%0\'dan Başlayan Sanal POS Oranı',
        'Sınırsız Trafik ve Web Alanı'
      ],
      buttonText: 'Sizi Arayalım',
      buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
      highlighted: false
    },
    {
      name: 'Scale',
      badge: '✨ En Çok Tercih Edilen',
      description: 'Tüm dünyaya satış yapın.',
      price: '4.990',
      oldPrice: '89.988',
      yearlyPrice: '59.880',
      monthlyLabel: '/ay +KDV',
      yearlyLabel: '/yıl +KDV',
      features: [
        '₺36.000 Değerinde Kargo Bakiyesi Hediye',
        '69.90 TL\'den Başlayan Anlaşmalı Kargo Fiyatları'
      ],
      buttonText: 'Sizi Arayalım',
      buttonStyle: 'bg-black text-white hover:bg-gray-800',
      highlighted: true
    },
    {
      name: 'Scale Plus',
      badge: 'Vade Farkısız 12 Taksit',
      description: 'E-Ticarette ihtiyacınız olan her şey.',
      price: '8.299',
      oldPrice: '149.976',
      yearlyPrice: '99.588',
      monthlyLabel: '/ay +KDV',
      yearlyLabel: '/yıl +KDV',
      features: [
        '₺48.000 Değerinde Kargo Bakiyesi Hediye',
        '62.90 TL\'den Başlayan Anlaşmalı Kargo Fiyatları'
      ],
      buttonText: 'Sizi Arayalım',
      buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
      highlighted: false
    },
    {
      name: 'Premium ✨',
      description: 'Büyük markalar için özel çözümler.',
      customText: 'Size Uygun Premium Planını Seçin',
      buttonText: 'Hemen Keşfet',
      buttonStyle: 'bg-gray-700 text-white hover:bg-gray-600',
      features: [
        '✓ Bireysel Müşteri Temsilcisi',
        '✓ Growth Manager ile Kişiselleştirilmiş Büyüme Desteği',
        '✓ Özel Tema Tasarımı ve Kodlanması',
        '✓ Özel Tema Kodlanması',
        '✓ Tüm Özellikleri İçerir'
      ],
      isDark: true,
      highlighted: false
    }
  ];

  const features = [
    { icon: '🔄', title: 'Sınırsız Trafik' },
    { icon: '💳', title: 'Satışlardan %0 Komisyon' },
    { icon: '🚚', title: 'İndirimli Kargo Fiyatları' },
    { icon: '💰', title: '12 Taksit ile Ödeme İmkanı' },
    { icon: '🎧', title: '7/24 Destek' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <span>₺48.000'e Kadar Kargonuz Bizden 🎁</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>0850 255 18 39</span>
            </div>
            <button className="flex items-center space-x-1 hover:text-gray-300">
              <Phone className="w-4 h-4" />
              <span>Sizi Arayalım</span>
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-bold text-gray-900">
                ⚡ ikas
              </h1>
              <nav className="hidden lg:flex space-x-6">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium">
                  <span>E-Ticaret</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium">
                  <span>Pazarlama</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="text-gray-700 hover:text-gray-900 font-medium">Fiyatlar</button>
                <button className="text-gray-700 hover:text-gray-900 font-medium">Referanslar</button>
                <button className="text-gray-700 hover:text-gray-900 font-medium">Premium</button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="hidden sm:block px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
                Giriş Yap
              </button>
              <button className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 font-medium">
                Ücretsiz E-Ticaret Siteni Aç
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-700">
            <span className="bg-purple-100 px-3 py-1 rounded-full text-sm font-medium">
              ikas ile E-Ticarete Başla ilk 6 Ay Kargo Bizden 🎁
            </span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            E-Ticaret Paketleri ve Fiyatları
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 transition-all ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-xl scale-105'
                  : plan.isDark
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold ${
                  plan.highlighted ? 'bg-purple-600 text-white' : 'bg-green-500 text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-4">
                <h3 className={`text-2xl font-bold mb-2 ${plan.isDark ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
              </div>

              {plan.customText ? (
                <div className="mb-6">
                  <p className="text-xl font-bold text-white">{plan.customText}</p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className={`text-4xl font-bold ${plan.isDark ? 'text-white' : 'text-gray-900'}`}>
                      ₺{plan.price}
                    </span>
                    <span className={`ml-1 text-sm ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {plan.monthlyLabel}
                    </span>
                  </div>
                  {plan.oldPrice && (
                    <div className={`mt-2 text-sm ${plan.isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="line-through">₺{plan.oldPrice}</span>
                      <span className="ml-2 font-semibold">₺{plan.yearlyPrice}{plan.yearlyLabel}</span>
                    </div>
                  )}
                </div>
              )}

              <button className={`w-full py-3 px-4 rounded-lg font-semibold transition mb-6 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>

              {plan.features && (
                <div className="space-y-3">
                  <p className={`text-sm font-semibold ${plan.isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {plan.customText ? '' : `${plan.name} Pakete Ek;`}
                  </p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className={`mt-0.5 ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature.includes('✓') ? '' : '✓'}
                      </span>
                      <span className={`text-sm ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-50 py-8 border-t border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <p className="font-semibold text-gray-900">Her ikas planında ücretsiz:</p>
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm font-medium text-gray-700">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">⚡ ikas</h3>
              <p className="text-gray-400 text-sm">E-ticarette yeni dönem</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ürünler</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white">E-Ticaret</button></li>
                <li><button className="hover:text-white">Pazarlama</button></li>
                <li><button className="hover:text-white">Premium</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Şirket</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white">Hakkımızda</button></li>
                <li><button className="hover:text-white">Kariyer</button></li>
                <li><button className="hover:text-white">İletişim</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Destek</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white">Yardım Merkezi</button></li>
                <li><button className="hover:text-white">0850 255 18 39</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ikas. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}