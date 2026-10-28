(() => {
// Cada alternativa soma um ponto ao perfil na mesma posição (0 a 3).
const answers = {
 'lado-oculto':[
 ['Entrar em lugares fora do roteiro.','Sentar em um lugar tranquilo e observar.','Fotografar detalhes e imaginar histórias.','Conhecer uma iniciativa local e ajudar.'],
 ['Eu toparia uma aventura inesperada.','Eu defenderia uma decisão com firmeza.','Eu mostraria algo que criei em segredo.','Eu tomaria a frente para proteger alguém.'],
 ['As experiências que ainda quero viver.','As ideias que amadureci em silêncio.','Os sentimentos transformados em palavras.','As situações em que fui mais corajoso do que imaginava.'],
 ['Proponho um tema que ninguém explorou.','Penso sozinho antes de trazer uma proposta.','Crio uma ideia a partir de uma sensação ou imagem.','Escolho uma causa que mereça nossa atenção.'],
 ['Uma viagem sem um roteiro fechado.','Um retiro com tempo para pensar.','Uma oficina para criar livremente.','Uma ação para defender algo em que acredito.'],
 ['Orientação para explorar novos lugares.','Concentração para mergulhar em assuntos complexos.','Uma linguagem artística para me expressar.','Coragem para intervir em situações difíceis.'],
 ['Quero descobrir outra maneira de fazer.','Reflito sobre meus próprios critérios.','Imagino como ela poderia ser reinventada.','Penso em quem é afetado e como me posicionar.'],
 ['Minha vontade de mudar tudo de vez em quando.','O quanto minhas convicções são profundas.','As muitas emoções que um detalhe desperta.','A intensidade com que quero cuidar de quem amo.'],
 ['A chance de sair do conhecido.','O espaço para construir algo no meu ritmo.','A possibilidade de criar uma nova história.','A chance de fazer uma diferença concreta.'],
 ['Você me ajudou a descobrir algo novo.','Sua firmeza me deu confiança.','Você me fez enxergar beleza em algo comum.','Você esteve presente quando foi preciso.']
 ],
 'razao-ou-emocao':[
 ['Comparo custo, tempo e benefícios.','Imagino onde me sentiria mais feliz.','Comparo as opções e escuto minha vontade.','Experimento uma parte de cada, se possível.'],
 ['Revejo as contas antes de decidir.','Percebo primeiro o quanto aquilo me empolga.','Considero o desejo e seu impacto nas contas.','Busco testar ou alugar antes de comprar.'],
 ['Ajudo a listar riscos e alternativas.','Pergunto como ele se sente com a ideia.','Converso sobre sentimentos e condições reais.','Sugiro um primeiro passo reversível.'],
 ['Busco dados para reduzir as dúvidas.','Percebo se a ideia me inspira confiança.','Analiso o cenário e minha reação a ele.','Faço um pequeno protótipo.'],
 ['Organizo os fatos e o ponto central.','Tento expressar o que senti.','Penso no ocorrido e no impacto emocional.','Começo a conversar e ajusto pelo diálogo.'],
 ['Conteúdo, duração e aplicação prática.','O entusiasmo que o tema desperta.','Interesse pessoal e viabilidade.','Uma aula experimental para sentir na prática.'],
 ['Verifico a fonte e o contexto.','Observo a reação que ela despertou em mim.','Reconheço a emoção e verifico a informação.','Procuro um exemplo concreto que possa conferir.'],
 ['Recalculo as opções disponíveis.','Escuto minha vontade de mudar ou insistir.','Reavalio as condições e como estou me sentindo.','Testo um ajuste e observo o efeito.'],
 ['Procuro exemplos que sustentem a crítica.','Percebo primeiro como ela me afetou.','Acolho minha reação e avalio os pontos úteis.','Faço uma alteração para ver se melhora.'],
 ['Um critério objetivo de comparação.','A opção que traz mais identificação.','Uma escolha que respeite necessidade e desejo.','A chance de começar pequeno e aprender.']
 ],
 'estilo-de-amar':[
 ['Ficar junto e escutar com calma.','Resolver uma tarefa para aliviar o dia.','Dizer o que admiro e oferecer acolhimento.','Convidar para uma mudança leve de cenário.'],
 ['Uma conversa em que o tempo passou sem perceber.','Um gesto de cuidado quando eu precisava.','Uma mensagem que traduziu algo importante.','Uma descoberta que vivemos juntos.'],
 ['Reservo um momento só para nós.','Faço algo que facilite a rotina.','Envio palavras carinhosas e específicas.','Proponho uma experiência diferente.'],
 ['Tempo com atenção de verdade.','Parceria nos pequenos cuidados.','Ouvir e dizer o que sentimos.','Fazer planos e descobrir coisas juntos.'],
 ['Estar presente para ouvir todos os detalhes.','Preparar algo que torne o dia especial.','Escrever o quanto reconheço seu esforço.','Criar uma comemoração fora da rotina.'],
 ['Um tempo juntos, com escuta.','Atitudes consistentes de cuidado.','Uma conversa sincera sobre o que sentimos.','Combinar um novo jeito de seguir juntos.'],
 ['Uma tarde reservada para minha companhia.','Uma necessidade minha resolvida com carinho.','Uma carta com lembranças e sentimentos.','Um passeio pensado para descobrirmos algo.'],
 ['Criar momentos sem celular ou pressa.','Dividir melhor as tarefas e necessidades.','Expressar mais o que valoriza em nós.','Manter espaço para interesses e planos novos.'],
 ['Ser ouvido sem interrupções.','Perceber atenção aos meus detalhes.','Receber reconhecimento em palavras.','Ter meus sonhos e minha autonomia apoiados.'],
 ['Continuarmos curiosos sobre a vida um do outro.','Cuidarmos do cotidiano em parceria.','Conseguirmos falar de sentimentos com abertura.','Crescermos sem perder espaço para explorar.']
 ],
 'ponto-forte':[
 ['Organizo o objetivo e os passos.','Escuto o que cada pessoa espera.','Proponho uma abordagem inesperada.','Começo uma tarefa para tirar a ideia do papel.'],
 ['Ajudo a separar o problema em partes.','Ofereço uma escuta atenta.','Imagino alternativas que ele não considerou.','Acompanho um primeiro passo concreto.'],
 ['Identifico o que é essencial.','Converso sobre como dividir a carga.','Sugiro um formato mais simples e original.','Assumo uma parte e inicio.'],
 ['Você tornou isso fácil de entender.','Você fez todo mundo se sentir ouvido.','Você pensou no que ninguém tinha pensado.','Você manteve as coisas andando.'],
 ['A clareza do propósito e das prioridades.','A confiança entre as pessoas.','A curiosidade por novas possibilidades.','O ritmo com uma entrega pequena.'],
 ['Divido o conteúdo e crio uma sequência.','Busco trocar e aprender com alguém.','Invento exemplos e conexões.','Pratico com consistência.'],
 ['Planejando recursos e etapas.','Acolhendo participantes.','Criando uma atividade diferente.','Executando as tarefas do dia.'],
 ['Investigo a causa antes de tentar de novo.','Converso sobre o impacto nas pessoas.','Penso em um caminho alternativo.','Recomeço com um ajuste possível.'],
 ['Uma visão organizada do desafio.','Pontes entre perspectivas.','Perguntas e ideias novas.','Disposição para assumir a execução.'],
 ['Ver que as partes fizeram sentido.','Perceber que as pessoas se fortaleceram.','Ver uma ideia ganhar uma forma original.','Saber que fui até a entrega.']
 ],
 'introvertido-ou-extrovertido':[
 ['Em casa, com pouca conversa.','Encontrando pessoas para descontrair.','Decidindo conforme minha energia.','Com alguém próximo, em um lugar tranquilo.'],
 ['Observo antes de me aproximar.','Puxo conversa com facilidade.','Alterno conversas e momentos de observação.','Procuro uma conversa mais longa com alguém.'],
 ['Pensando ou escrevendo sozinho.','Conversando para organizar o raciocínio.','Penso um pouco e depois troco ideias.','Converso com uma pessoa de confiança.'],
 ['Alguns minutos sem estímulos.','Uma conversa animada.','Às vezes silêncio, às vezes companhia.','Um café com alguém próximo.'],
 ['Uma atividade individual e tranquila.','Um evento com bastante interação.','Um encontro com espaço para entrar e sair.','Uma mesa pequena com boa conversa.'],
 ['Escuto e falo quando organizei a ideia.','Penso junto e participo bastante.','Meu ritmo muda com o assunto e o grupo.','Me envolvo quando a conversa se aprofunda.'],
 ['Um bom tempo sozinho.','Continuar conversando com alguém.','Depende de como me senti no evento.','Reencontrar uma companhia mais íntima.'],
 ['Será que vou ter tempo para descansar?','Pode ser uma ótima chance de encontrar gente.','Como está minha energia agora?','Quem vai e como será a conversa?'],
 ['Aos poucos, sem muita exposição.','Em atividades com muitas oportunidades de troca.','Variando encontros tranquilos e animados.','Em uma conversa sobre interesses em comum.'],
 ['Poucos compromissos e tempo só meu.','Vários encontros e movimento.','Uma mistura de companhia e descanso.','Tempo de qualidade com pessoas escolhidas.']
 ],
 'sob-pressao':[
 ['Comparo urgência e impacto.','Converso para dividir ou renegociar.','Faço uma pausa breve para me situar.','Concluo uma pequena parte imediatamente.'],
 ['Mapeio as opções que ainda existem.','Aviso as pessoas e peço colaboração.','Respiro e me afasto um instante.','Atuo no que posso resolver agora.'],
 ['Reorganizo as prioridades.','Peço ajuda e converso sobre os limites.','Reservo um momento para reconhecer meu estado.','Entrego uma parte e ajusto o restante.'],
 ['Separar o assunto principal dos detalhes.','Ter alguém ajudando a mediar.','Pedir um intervalo antes de continuar.','Propor uma ação para destravar o impasse.'],
 ['Aciono um plano alternativo.','Chamo alguém para resolver comigo.','Paro por um instante para recuperar a calma.','Testo uma solução prática de imediato.'],
 ['Peço os dados essenciais antes de responder.','Busco uma segunda perspectiva.','Peço algum tempo para pensar.','Proponho um primeiro passo reversível.'],
 ['Desenhar uma nova sequência.','Combinar o próximo passo com os envolvidos.','Ter um momento para absorver a mudança.','Começar pelo que ainda pode ser feito.'],
 ['Escrevo o problema e o que posso controlar.','Compartilho com alguém de confiança.','Crio uma pausa longe do assunto.','Faço uma tarefa concreta relacionada a ele.'],
 ['Ajudo a definir prioridades.','Procuro manter a comunicação aberta.','Sugiro um intervalo para retomarmos melhor.','Assumo uma ação possível para começarmos.'],
 ['Reviso o que funcionou e o que mudar.','Converso com quem passou por isso comigo.','Busco descanso e tempo para processar.','Retomo atividades simples para recuperar o ritmo.']
 ]
};

window.RevelaMenteData = window.RevelaMenteData || {};
window.RevelaMenteData.answers = answers;
})();
