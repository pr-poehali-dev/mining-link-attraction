import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [referralCode, setReferralCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('r');
    if (refCode) {
      localStorage.setItem('referrer', refCode);
    }
  }, []);

  const generateReferralLink = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setReferralCode(newCode);
  };

  const copyToClipboard = () => {
    const link = `${window.location.origin}/?r=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopiedCode(true);
    toast({
      title: "Ссылка скопирована!",
      description: "Реферальная ссылка скопирована в буфер обмена",
    });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Coins" className="text-primary-foreground" size={24} />
            </div>
            <h1 className="text-xl font-bold">RubleMining</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <Icon name="LogIn" size={18} />
            Войти
          </Button>
        </div>
      </header>

      <section className="py-20 px-4 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-4 py-1">Майнинг криптовалюты</Badge>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Майнинг РУБЛЯ<br />
              <span className="text-primary">Начни зарабатывать сегодня</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Присоединяйся к системе майнинга, получи приветственный бонус и начинай зарабатывать с помощью реферальной программы
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6 gap-2" onClick={generateReferralLink}>
                <Icon name="Rocket" size={20} />
                Получить реферальную ссылку
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 gap-2">
                <Icon name="PlayCircle" size={20} />
                Как это работает
              </Button>
            </div>

            {referralCode && (
              <Card className="mt-8 max-w-2xl mx-auto animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Gift" size={24} className="text-primary" />
                    Ваша реферальная ссылка готова!
                  </CardTitle>
                  <CardDescription>Поделитесь ссылкой и получайте бонусы за каждого приглашенного</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input 
                      readOnly 
                      value={`${window.location.origin}/?r=${referralCode}`}
                      className="font-mono text-sm"
                    />
                    <Button onClick={copyToClipboard} className="gap-2 shrink-0">
                      <Icon name={copiedCode ? "Check" : "Copy"} size={18} />
                      {copiedCode ? "Скопировано" : "Копировать"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
                    <Icon name="Info" size={16} />
                    Ваш реферальный код: <span className="font-bold text-primary">{referralCode}</span>
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <Icon name="UserPlus" className="text-primary" size={24} />
                </div>
                <CardTitle>Приветственный бонус</CardTitle>
                <CardDescription>Получите стартовый капитал при регистрации по реферальной ссылке</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <Icon name="TrendingUp" className="text-primary" size={24} />
                </div>
                <CardTitle>Реферальная программа</CardTitle>
                <CardDescription>Зарабатывайте процент от майнинга всех приглашенных пользователей</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <Icon name="Shield" className="text-primary" size={24} />
                </div>
                <CardTitle>Автоматическое назначение</CardTitle>
                <CardDescription>Если у вас нет реферера, система назначит его автоматически</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">О проекте RubleMining</h3>
            <p className="text-muted-foreground text-lg">Современная платформа для майнинга криптовалюты</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" className="text-primary" size={24} />
                  Наша миссия
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Предоставить доступный и прозрачный способ заработка через майнинг криптовалюты. 
                  Мы создали систему, где каждый может начать зарабатывать независимо от опыта.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" className="text-primary" size={24} />
                  Преимущества
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 shrink-0" size={16} />
                    <span>Быстрый старт без вложений</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 shrink-0" size={16} />
                    <span>Многоуровневая реферальная система</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 shrink-0" size={16} />
                    <span>Прозрачная статистика и выплаты</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Как начать зарабатывать</h3>
            <p className="text-muted-foreground text-lg">Простой путь к первым доходам</p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Получите реферальную ссылку",
                description: "Нажмите кнопку выше и получите уникальную реферальную ссылку с вашим кодом",
                icon: "Link"
              },
              {
                step: "2",
                title: "Поделитесь с друзьями",
                description: "Отправьте ссылку друзьям, знакомым или опубликуйте в социальных сетях",
                icon: "Share2"
              },
              {
                step: "3",
                title: "Получите приветственный бонус",
                description: "Когда человек перейдет по вашей ссылке, оба получите стартовый бонус",
                icon: "Gift"
              },
              {
                step: "4",
                title: "Начните майнить",
                description: "Зарабатывайте на собственном майнинге и получайте процент от доходов рефералов",
                icon: "TrendingUp"
              }
            ].map((item, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        <Icon name={item.icon as any} className="text-primary" size={20} />
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-base">{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="mt-8 bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="AlertCircle" size={24} className="shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Важно!</p>
                  <p className="text-primary-foreground/90">
                    Если у вас не будет реферера, система автоматически назначит его вам. 
                    Это гарантирует, что вы сможете начать зарабатывать сразу после регистрации.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Техническая документация</h3>
            <p className="text-muted-foreground text-lg">Подробная информация о системе и требованиях</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="requirements" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Icon name="Server" className="text-primary" size={20} />
                  <span className="font-semibold">Системные требования</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4 space-y-2">
                <p><strong>Минимальные требования:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Стабильное интернет-соединение (минимум 1 Мбит/с)</li>
                  <li>Современный браузер (Chrome, Firefox, Safari, Edge)</li>
                  <li>Активный email для регистрации</li>
                  <li>Возраст 18+ для участия в программе</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="referral" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Icon name="Users" className="text-primary" size={20} />
                  <span className="font-semibold">Как работает реферальная система</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4 space-y-2">
                <p>Реферальная программа включает несколько уровней вознаграждений:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Приветственный бонус:</strong> Получите стартовый капитал при регистрации</li>
                  <li><strong>Прямые рефералы:</strong> 10% от майнинга приглашенных пользователей</li>
                  <li><strong>Второй уровень:</strong> 5% от майнинга рефералов ваших рефералов</li>
                  <li><strong>Бонусы за активность:</strong> Дополнительные награды за активных рефералов</li>
                </ul>
                <p className="mt-4">Все начисления происходят автоматически и отображаются в личном кабинете.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mining" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Icon name="Cpu" className="text-primary" size={20} />
                  <span className="font-semibold">Процесс майнинга</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4 space-y-2">
                <p>Майнинг в нашей системе происходит следующим образом:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Майнинг происходит на серверной стороне, не нагружая ваше устройство</li>
                  <li>Мощность распределяется в зависимости от вашего уровня и активности</li>
                  <li>Доход начисляется каждые 24 часа автоматически</li>
                  <li>Минимальная сумма для вывода средств составляет 1000 рублей</li>
                  <li>Вывод средств осуществляется в течение 1-3 рабочих дней</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Icon name="ShieldCheck" className="text-primary" size={20} />
                  <span className="font-semibold">Безопасность и защита данных</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4 space-y-2">
                <p>Мы используем современные технологии для защиты ваших данных:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>SSL-шифрование для всех соединений</li>
                  <li>Двухфакторная аутентификация (2FA)</li>
                  <li>Регулярные проверки безопасности системы</li>
                  <li>Шифрование персональных данных в базе данных</li>
                  <li>Защита от DDoS-атак и взломов</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Icon name="HelpCircle" className="text-primary" size={20} />
                  <span className="font-semibold">Часто задаваемые вопросы</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4 space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-1">Сколько можно заработать?</p>
                  <p>Доход зависит от вашей активности и количества рефералов. В среднем активные пользователи зарабатывают от 5,000 до 50,000 рублей в месяц.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Нужно ли вкладывать деньги?</p>
                  <p>Нет, вы можете начать полностью бесплатно. Получите приветственный бонус и начните майнить без вложений.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Как вывести заработанные средства?</p>
                  <p>Выберите удобный способ вывода в личном кабинете: банковская карта, электронные кошельки или криптовалюта.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <footer className="border-t bg-card/50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Coins" className="text-primary-foreground" size={18} />
                </div>
                <span className="font-bold">RubleMining</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Надежная платформа для майнинга криптовалюты
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Как начать</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Документация</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Связаться с нами</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Send" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Mail" size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 RubleMining. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
