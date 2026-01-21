export interface DailyContent {
  mindset: string;
  action: string;
  opportunity: string;
  energyLevel: number;
}

export type PredictionMatrix = Record<number, Record<number, DailyContent>>;

export const DAILY_PREDICTIONS: PredictionMatrix = {
  // --- THẾ GIỚI 1: KHỞI ĐẦU & KHAI PHÁ ---
  1: {
    1: {
      mindset: "Giữa những ồn ào của đám đông, tiếng nói bên trong bạn chính là chiếc la bàn duy nhất đáng tin cậy. Hãy can đảm tin vào bản ngã của mình dù chưa có một minh chứng nào hiện hữu.",
      action: "Hãy đặt viên gạch đầu tiên cho dự án mà bạn từng sợ hãi. Viết ra một lời cam kết với chính mình và thực hiện nó như một nghi thức khẳng định vị thế cá nhân.",
      opportunity: "Sự tự tin không đến từ kết quả, nó đến từ khoảnh khắc bạn dám đứng lên lãnh đạo cuộc đời mình. Một cánh cửa mới sẽ mở ra ngay khi bạn thôi chờ đợi sự cho phép từ người khác.",
      energyLevel: 100
    },
    2: {
      mindset: "Sức mạnh thực sự của một nhà lãnh đạo đôi khi nằm ở khả năng lùi lại và thấu cảm. Sự mềm mỏng không phải là yếu đuối, đó là nghệ thuật của sự kiên nhẫn.",
      action: "Dành thời gian để thực sự nghe thấy những gì người khác chưa nói ra. Hãy tìm kiếm sự đồng thuận thay vì cố gắng giành lấy phần thắng về mình.",
      opportunity: "Một mối nhân duyên lành hoặc một sự cộng tác sâu sắc sẽ hình thành, mang lại cho bạn những nguồn lực mà một mình bạn không thể có được.",
      energyLevel: 60
    },
    3: {
      mindset: "Mỗi ý tưởng của bạn là một hạt giống đang chờ ánh mặt trời để nảy mầm. Hôm nay, hãy cho phép sự sáng tạo của bạn được tuôn chảy tự nhiên không định kiến.",
      action: "Chia sẻ câu chuyện hoặc ý tưởng của bạn qua câu chữ hoặc hình ảnh. Hãy để thế giới biết bạn là ai thông qua những rung động cá nhân chân thực nhất.",
      opportunity: "Một lời khen ngợi chân thành hoặc sự ghi nhận từ người có tầm ảnh hưởng sẽ là bệ phóng tâm lý giúp bạn tin tưởng hơn vào con đường mình chọn.",
      energyLevel: 85
    },
    4: {
      mindset: "Để xây dựng một tòa đài các, bạn cần một nền móng vững chãi dưới đôi chân. Sự hào hứng ban đầu cần được nuôi dưỡng bằng sự kỷ luật và thực tế.",
      action: "Sắp xếp lại các ưu tiên, lập một kế hoạch chi tiết cho những bước đi tiếp theo. Hãy biến những mơ mộng viển vông thành những con số và mục tiêu cụ thể.",
      opportunity: "Sự ổn định và lòng tin từ những người xung quanh sẽ mang lại cho bạn sự an tâm tuyệt đối, tạo đà cho những bước tiến lớn vào ngày mai.",
      energyLevel: 75
    },
    5: {
      mindset: "Sự bế tắc đôi khi là lời mời gọi của vũ trụ để bạn phá vỡ những ranh giới cũ kỹ. Đừng sợ hãi sự thay đổi, vì đó là hơi thở của sự sống.",
      action: "Thử một con đường mới, gặp một người lạ hoặc thay đổi nhịp sinh hoạt thường nhật. Hãy để những trải nghiệm mới mẻ đánh thức các giác quan đang ngủ quên.",
      opportunity: "Một bước ngoặt bất ngờ trong công việc hoặc một ý tưởng đột phá sẽ xuất hiện khi bạn dám bước ra khỏi vùng an toàn của chính mình.",
      energyLevel: 95
    },
    6: {
      mindset: "Thành công lớn nhất của một con người là có một chốn để về và những người để yêu thương. Hãy để lòng trắc ẩn dẫn dắt mọi quyết định trong ngày hôm nay.",
      action: "Dành thời gian chất lượng để chăm sóc không gian sống hoặc vỗ về những người thân yêu. Một lời hỏi thăm đúng lúc có thể hàn gắn những rạn nứt từ lâu.",
      opportunity: "Sự bình an nội tâm và cảm giác được thuộc về sẽ tiếp thêm cho bạn nguồn sức mạnh vô tận để đương đầu với những bão giông bên ngoài.",
      energyLevel: 70
    },
    7: {
      mindset: "Tâm hồn bạn lúc này giống như một mặt hồ lặng sóng, nơi những câu trả lời vốn dĩ đã nằm sẵn dưới đáy sâu. Đừng sợ sự cô độc, đó là lúc bạn tìm thấy chính mình.",
      action: "Rút lui khỏi thế giới ồn ào, tìm đến thiên nhiên hoặc trang sách để chiêm nghiệm. Hãy viết ra những suy nghĩ lộn xộn để lọc lấy tinh hoa tri thức.",
      opportunity: "Một sự thật hiển nhiên hoặc một 'Aha-moment' sẽ xuất hiện, giúp bạn giải mã được những nút thắt trong lòng bấy lâu nay.",
      energyLevel: 55
    },
    8: {
      mindset: "Bạn được sinh ra để tạo ra những giá trị hữu hình và làm chủ vận mệnh tài chính của mình. Hãy để tư duy thịnh vượng dẫn lối cho mọi hành động.",
      action: "Thực hiện những bước đi quyết đoán trong kinh doanh hoặc quản lý tài sản. Đừng ngần ngại khẳng định giá trị của mình trong các cuộc đàm phán quan trọng.",
      opportunity: "Những thành quả về vật chất hoặc một vị thế mới trong xã hội sẽ tìm đến như một sự hồi đáp xứng đáng cho những nỗ lực bền bỉ của bạn.",
      energyLevel: 90
    },
    9: {
      mindset: "Mỗi kết thúc thực chất là một khởi đầu được ngụy trang dưới hình thức khác. Hãy buông tay khỏi những gì không còn phục vụ cho sự phát triển của bạn.",
      action: "Hoàn tất những việc dang dở, tha thứ cho những lỗi lầm cũ và dọn dẹp không gian tinh thần. Hãy để quá khứ ngủ yên để nhường chỗ cho tương lai.",
      opportunity: "Sự nhẹ lòng và một tầm nhìn rộng lớn hơn về sứ mệnh cuộc đời sẽ xuất hiện, chuẩn bị cho bạn bước vào một chương mới rực rỡ hơn.",
      energyLevel: 80
    }
  },

  // --- THẾ GIỚI 2: KẾT NỐI & THẤU CẢM ---
  2: {
    1: {
      mindset: "Sức mạnh của sự dịu dàng có thể lay chuyển được những trái tim cứng rắn nhất. Hãy dẫn dắt bằng sự thấu cảm thay vì áp đặt quyền lực.",
      action: "Hãy là người khơi gợi cảm hứng cho người khác bằng những lời động viên chân thành. Đứng sau hỗ trợ nhưng lại mang tầm vóc của một người dẫn đường.",
      opportunity: "Bạn nhận được sự tôn trọng và tin tưởng tuyệt đối từ đồng nghiệp, tạo tiền đề cho những vị trí lãnh đạo mang tính nhân văn trong tương lai.",
      energyLevel: 75
    },
    2: {
      mindset: "Trực giác là ngôn ngữ của linh hồn đang thì thầm bên tai bạn. Hôm nay, cảm xúc chính là người dẫn đường đáng tin cậy nhất mà bạn có.",
      action: "Dành trọn vẹn sự hiện diện của mình cho những cuộc đối thoại sâu sắc. Hãy lắng nghe bằng cả trái tim thay vì chỉ bằng đôi tai.",
      opportunity: "Một sợi dây liên kết tâm linh hoặc một người bạn tâm giao sẽ xuất hiện, mang lại cảm giác ấm áp và thấu hiểu đến lạ kỳ.",
      energyLevel: 100
    },
    3: {
      mindset: "Niềm vui sẽ được nhân đôi khi ta biết sẻ chia, và nỗi buồn sẽ vơi đi một nửa khi ta có người đồng hành. Hãy lan tỏa sự rạng rỡ của bạn ra xung quanh.",
      action: "Tham gia vào các buổi gặp gỡ, trò chuyện và bộc lộ những khía cạnh vui vẻ của bản thân. Hãy để nụ cười của bạn trở thành liều thuốc chữa lành cho người khác.",
      opportunity: "Một lời mời đầy cảm hứng hoặc một cơ hội hợp tác mang tính sáng tạo sẽ đến từ những vòng kết nối xã hội của bạn.",
      energyLevel: 80
    },
    4: {
      mindset: "Một mối quan hệ bền vững không được xây dựng trên những lời thề thốt, mà trên những hành động nhỏ nhặt nhưng đều đặn mỗi ngày.",
      action: "Thực hiện đúng những cam kết dù là nhỏ nhất với người thân hoặc đối tác. Hãy xây dựng lòng tin bằng sự tỉ mỉ và trách nhiệm.",
      opportunity: "Sự cam kết lâu dài và một nền tảng tình cảm vững chắc sẽ được củng cố, giúp bạn cảm thấy an tâm trong mọi quyết định lớn hơn.",
      energyLevel: 65
    },
    5: {
      mindset: "Linh hoạt trong giao tiếp không có nghĩa là đánh mất bản sắc, mà là biết cách hòa nhập vào dòng chảy của những năng lượng khác nhau.",
      action: "Mở rộng mạng lưới quan hệ với những người có tư duy khác biệt. Đừng ngại thay đổi cách tiếp cận để tìm thấy tiếng nói chung với những đối tượng mới.",
      opportunity: "Một thông tin quan trọng hoặc một cơ hội hợp tác bất ngờ từ một người bạn ở xa sẽ mở ra những chân trời mới cho sự nghiệp của bạn.",
      energyLevel: 85
    },
    6: {
      mindset: "Hạnh phúc không phải là được nhận lấy, mà là được chăm sóc và nuôi dưỡng những điều quý giá đối với mình. Yêu thương chính là sức mạnh lớn nhất.",
      action: "Hãy là điểm tựa vững chắc cho ai đó đang cần sự hỗ trợ. Một bữa tối ấm cúng hoặc một món quà tinh thần nhỏ sẽ mang lại giá trị rất lớn.",
      opportunity: "Sự gắn kết gia đình được thắt chặt và bạn sẽ nhận lại một dòng chảy năng lượng yêu thương đầy ắp, giúp xua tan mọi mệt mỏi.",
      energyLevel: 90
    },
    7: {
      mindset: "Trong thế giới ồn ào này, sự im lặng đôi khi chính là câu trả lời hùng hồn nhất. Hãy để tâm trí được lắng đọng để thấu hiểu bản chất của các mối quan hệ.",
      action: "Quan sát nhiều hơn và nói ít đi. Dành thời gian để nghiên cứu sâu về tâm lý hoặc những mong đợi thầm kín của đối phương trước khi phản hồi.",
      opportunity: "Bạn sẽ khám phá ra một sự thật quan trọng giúp hóa giải những hiểu lầm dai dẳng, mang lại sự thông thái trong cách cư xử sau này.",
      energyLevel: 60
    },
    8: {
      mindset: "Sự công bằng và minh bạch là chìa khóa để duy trì sự thịnh vượng trong mọi cuộc hợp tác. Khi lợi ích được chia sẻ, giá trị sẽ được nhân lên.",
      action: "Thảo luận thẳng thắn về quyền lợi và trách nhiệm trong công việc. Hãy đàm phán trên tinh thần cả hai cùng thắng để duy trì mối quan hệ bền lâu.",
      opportunity: "Một dòng tiền hoặc lợi nhuận đáng kể sẽ đến từ những dự án chung, minh chứng cho việc bạn đã chọn đúng người đồng hành.",
      energyLevel: 85
    },
    9: {
      mindset: "Lòng bao dung chính là món quà bạn dành cho chính mình để giải phóng tâm hồn khỏi những gánh nặng của quá khứ. Hãy chọn cách buông xả.",
      action: "Viết thư hoặc trực tiếp nói lời tha thứ cho những người đã làm tổn thương bạn. Khép lại những tranh cãi không hồi kết để bước tiếp một cách nhẹ nhàng.",
      opportunity: "Sự an nhiên tự tại và một tâm hồn rộng mở sẽ giúp bạn thu hút được những mối quan hệ mới thanh sạch và ý nghĩa hơn.",
      energyLevel: 75
    }
  },

  // --- THẾ GIỚI 3: TRUYỀN CẢM HỨNG & TỰ DO BIỂU ĐẠT ---
  3: {
    1: {
      mindset: "Bạn là nghệ sĩ tài ba nhất trong chính cuộc đời mình. Hôm nay, đừng ngần ngại phác họa nên những nét vẽ cá tính và khác biệt.",
      action: "Tự tin trình bày quan điểm cá nhân trong công việc hoặc trên mạng xã hội. Hãy để giọng nói của bạn được cất lên một cách dõng dạc nhất.",
      opportunity: "Sự tỏa sáng của bạn thu hút được những nguồn lực mới và những người cùng chí hướng muốn được đồng hành cùng tầm nhìn của bạn.",
      energyLevel: 90
    },
    2: {
      mindset: "Ngôn từ có sức mạnh chữa lành hoặc gây tổn thương, hãy dùng chúng như những đóa hoa để tô điểm cho các mối quan hệ quanh bạn.",
      action: "Gửi những thông điệp yêu thương hoặc lời xin lỗi chân thành. Hãy để sự dịu dàng trong giao tiếp xóa nhòa những khoảng cách vô hình.",
      opportunity: "Một hiểu lầm cũ được hóa giải bằng sự chân thành, mở ra cơ hội để xây dựng lại niềm tin sâu sắc hơn với người quan trọng.",
      energyLevel: 70
    },
    3: {
      mindset: "Năng lượng tích cực của bạn là một loại tài sản vô hình có khả năng thắp sáng cả những góc tối nhất. Hãy cho phép mình được vui đùa như một đứa trẻ.",
      action: "Thực hiện một dự án sáng tạo, tham gia một buổi tiệc hoặc đơn giản là làm điều gì đó khiến bạn bật cười sảng khoái.",
      opportunity: "Bạn trở thành tâm điểm của sự chú ý và nhận được những lời mời hợp tác hấp dẫn nhờ vào thần thái rạng ngời của mình.",
      energyLevel: 100
    },
    4: {
      mindset: "Sáng tạo mà không có kỷ luật sẽ chỉ là những giấc mơ dang dở. Hãy biến những bay bổng thành những quy trình có thể thực thi.",
      action: "Sắp xếp lại các ý tưởng vào một hệ thống quản lý. Tập trung hoàn thành một sản phẩm cụ thể thay vì đuổi theo quá nhiều ý nghĩ cùng lúc.",
      opportunity: "Một ý tưởng độc đáo của bạn sẽ được cấp trên hoặc thị trường đón nhận vì tính thực tiễn cao, mang lại giá trị kinh tế rõ rệt.",
      energyLevel: 65
    },
    5: {
      mindset: "Thế giới này quá rộng lớn để chỉ đứng yên một chỗ. Hãy để những trải nghiệm mới mẻ làm phong phú thêm vốn sống và tư duy của bạn.",
      action: "Lên kế hoạch cho một chuyến đi ngắn hoặc tham gia một khóa học về một lĩnh vực bạn chưa từng biết đến. Phá vỡ những thói quen cũ kỹ.",
      opportunity: "Một góc nhìn hoàn toàn mới sẽ giúp bạn giải quyết được bài toán khó trong công việc, đồng thời mở ra những kênh thu nhập không ngờ.",
      energyLevel: 95
    },
    6: {
      mindset: "Nghệ thuật đích thực bắt nguồn từ tình yêu thương. Hôm nay, hãy dùng sự sáng tạo của mình để làm đẹp thêm cho tổ ấm và những người thân yêu.",
      action: "Trang trí lại góc làm việc, nấu một món ăn mới hoặc tạo ra một bất ngờ nhỏ cho gia đình. Hãy để cái đẹp len lỏi vào từng ngóc ngách đời thường.",
      opportunity: "Những khoảnh khắc hạnh phúc bình dị sẽ trở thành nguồn cảm hứng lớn lao cho công việc sáng tạo lâu dài của bạn.",
      energyLevel: 80
    },
    7: {
      mindset: "Sự sâu sắc không nằm ở bề nổi của ngôn từ, mà ở tầng nghĩa ẩn sau đó. Hãy dành thời gian để nghiên cứu và chiêm nghiệm sâu sắc.",
      action: "Viết nhật ký, đọc những cuốn sách về triết học hoặc nghiên cứu sâu về chuyên môn của mình. Hãy để kiến thức được thẩm thấu qua sự tĩnh lặng.",
      opportunity: "Bạn sẽ được công nhận như một chuyên gia trong lĩnh vực của mình nhờ những nhận định sắc sảo và mang tính chuyên môn cao.",
      energyLevel: 75
    },
    8: {
      mindset: "Khả năng truyền cảm hứng của bạn chính là đòn bẩy để tạo ra sự thịnh vượng. Hãy học cách marketing bản thân và giá trị mà bạn mang lại.",
      action: "Thực hiện các hoạt động quảng bá, đàm phán hợp đồng hoặc chốt các giao dịch quan trọng. Đừng ngại nói về giá trị kinh tế của sự sáng tạo.",
      opportunity: "Một hợp đồng giá trị lớn hoặc một sự tăng trưởng mạnh mẽ về doanh thu sẽ là kết quả của việc bạn biết cách truyền đạt giá trị của mình.",
      energyLevel: 85
    },
    9: {
      mindset: "Khi bạn nói bằng tiếng nói của cộng đồng, thông điệp của bạn sẽ vang xa mãi mãi. Hãy hướng sự sáng tạo của mình về những giá trị nhân văn.",
      action: "Tham gia các dự án cộng đồng, viết bài chia sẻ giá trị sống tích cực. Hãy dùng sức ảnh hưởng của mình để giúp đỡ những người yếu thế hơn.",
      opportunity: "Sự tôn trọng từ cộng đồng và cảm giác trọn vẹn về sứ mệnh sẽ mang lại cho bạn một niềm hạnh phúc vượt xa những giá trị vật chất.",
      energyLevel: 80
    }
  },

  // --- THẾ GIỚI 4: KỶ LUẬT & NỀN TẢNG VỮNG CHẮC ---
  4: {
    1: {
      mindset: "Sự tự do thực sự chỉ có được khi bạn làm chủ được những thói quen của chính mình. Hãy thiết lập một trật tự mới cho cuộc đời bạn.",
      action: "Bắt đầu một chế độ tập luyện, một quy trình làm việc mới hoặc thiết lập các quy tắc cá nhân. Hãy kiên định với những gì bạn đã đặt ra.",
      opportunity: "Bạn được cấp trên tin tưởng giao phó những dự án quan trọng hơn nhờ vào sự chuyên nghiệp và khả năng quản trị xuất sắc.",
      energyLevel: 80
    },
    2: {
      mindset: "Sự ổn định trong tâm hồn là tiền đề cho sự thấu hiểu trong mối quan hệ. Hãy học cách giữ bình tĩnh trước mọi biến động cảm xúc.",
      action: "Ngồi xuống và cùng người đồng hành giải quyết những vấn đề còn tồn đọng dựa trên các con số và sự thật khách quan. Tránh cảm tính.",
      opportunity: "Một thỏa thuận hoặc hợp đồng hợp tác dài hạn sẽ được ký kết nhờ vào sự chân thành và nền tảng pháp lý rõ ràng mà bạn đã chuẩn bị.",
      energyLevel: 55
    },
    3: {
      mindset: "Kế hoạch hóa sự sáng tạo không làm mất đi cảm hứng, trái lại nó giúp ý tưởng của bạn có cơ hội trở thành hiện thực.",
      action: "Hệ thống hóa các ý tưởng rời rạc vào một khung sườn cụ thể. Tạo ra một bảng hướng dẫn thực hiện cho những việc bạn đang theo đuổi.",
      opportunity: "Ý tưởng của bạn được hiện thực hóa và mang lại kết quả đo lường được, giúp bạn khẳng định năng lực thực thi chứ không chỉ là lời nói.",
      energyLevel: 70
    },
    4: {
      mindset: "Hôm nay là ngày để bạn hoàn thiện những mảnh ghép cuối cùng của bức tranh. Sự kiên trì và tỉ mỉ chính là chìa khóa của thành công.",
      action: "Kiểm tra lại toàn bộ sổ sách tài chính, hoàn tất các báo cáo hoặc dọn dẹp triệt để không gian làm việc. Đừng để sót bất kỳ chi tiết nhỏ nào.",
      opportunity: "Một cảm giác thỏa mãn tuyệt đối khi mọi thứ vào đúng quỹ đạo. Bạn đã xây dựng xong một bệ phóng vững chãi cho những cú nhảy vọt tiếp theo.",
      energyLevel: 100
    },
    5: {
      mindset: "Thay đổi là điều tất yếu, nhưng thay đổi trong sự kiểm soát mới là sự khôn ngoan của người thành đạt. Hãy cải tiến thay vì phá bỏ hoàn toàn.",
      action: "Tìm cách tối ưu hóa quy trình hiện tại bằng những công nghệ hoặc phương pháp mới. Hãy linh hoạt nhưng vẫn giữ vững các nguyên tắc cốt lõi.",
      opportunity: "Một cơ hội thăng tiến hoặc mở rộng kinh doanh sẽ xuất hiện nhờ vào khả năng thích nghi tuyệt vời của bạn trong môi trường ổn định.",
      energyLevel: 75
    },
    6: {
      mindset: "Gia đình là pháo đài cuối cùng bảo vệ bạn trước những bão giông cuộc đời. Hãy dành sự tận tâm để xây dựng tổ ấm vững chắc.",
      action: "Lập kế hoạch tài chính dài hạn cho gia đình, sửa chữa những đồ đạc hỏng hóc hoặc chăm sóc sức khỏe cho người thân một cách thực tế.",
      opportunity: "Giá trị tài sản ròng của bạn tăng lên hoặc gia đình đón nhận tin vui về nhà đất, đầu tư lâu dài mang lại quả ngọt.",
      energyLevel: 85
    },
    7: {
      mindset: "Tri thức chân chính cần thời gian để thẩm thấu và kiểm chứng qua thực tế. Đừng vội vã đưa ra quyết định khi chưa có đủ dữ liệu.",
      action: "Dành cả ngày để nghiên cứu chuyên sâu, đọc các tài liệu kỹ thuật hoặc tham khảo ý kiến chuyên gia. Hãy là một người học trò khiêm tốn.",
      opportunity: "Bạn sẽ phát hiện ra một lỗ hổng quan trọng trong kế hoạch hiện tại, giúp tiết kiệm được rất nhiều nguồn lực và tránh rủi ro lớn.",
      energyLevel: 70
    },
    8: {
      mindset: "Tiền bạc là kết quả của một hệ thống vận hành thông minh và kỷ luật thép. Hãy tập trung vào việc quản lý và nhân rộng dòng tiền.",
      action: "Đầu tư vào những danh mục an toàn, tối ưu hóa chi phí vận hành doanh nghiệp hoặc cá nhân. Hãy hành động với tư duy của một nhà tư bản thực thụ.",
      opportunity: "Dòng tiền ổn định và sự tăng trưởng vững chắc về tài chính sẽ là minh chứng cho năng lực quản trị xuất sắc của bạn ngày hôm nay.",
      energyLevel: 90
    },
    9: {
      mindset: "Mọi nỗ lực đều cần một điểm dừng để tổng kết và rút ra bài học. Hãy khép lại những việc đã xong để chuẩn bị cho một chu kỳ mới.",
      action: "Kết thúc những hợp đồng cũ, hoàn tất nghĩa vụ với các đối tác và giải phóng những nguồn lực không còn hiệu quả. Hãy làm sạch nền tảng.",
      opportunity: "Sự nhẹ nhàng khi hoàn tất mọi trách nhiệm giúp bạn có được một không gian tinh thần mới để đón nhận những sứ mệnh cao cả hơn.",
      energyLevel: 75
    }
  },

  // --- THẾ GIỚI 5: TỰ DO & SỰ BIẾN ĐỔI LINH HOẠT ---
  5: {
    1: {
      mindset: "Bạn là người dẫn đầu trong cơn lốc của sự thay đổi. Đừng sợ hãi trước những điều chưa biết, hãy cưỡi lên con sóng của sự đổi mới.",
      action: "Thử nghiệm một mô hình kinh doanh mới hoặc bắt đầu một thói quen táo bạo. Hãy thể hiện sự độc lập và tiên phong trong mọi hành động.",
      opportunity: "Một cơ hội dẫn đầu xu hướng thị trường sẽ tìm đến với bạn, giúp bạn khẳng định vị thế của một người mở đường thực thụ.",
      energyLevel: 95
    },
    2: {
      mindset: "Trong thế giới đầy biến động, sự thấu cảm chính là mỏ neo giữ bạn không bị cuốn trôi. Hãy linh hoạt nhưng đừng đánh mất tâm hồn.",
      action: "Kết nối với những người bạn mới từ những lĩnh vực xa lạ. Lắng nghe những quan điểm trái chiều để làm phong phú thêm vốn sống của mình.",
      opportunity: "Một cuộc gặp gỡ tình cờ sẽ mở ra một mối quan hệ hợp tác đầy tiềm năng, giúp bạn tiếp cận được những nguồn tài nguyên bất ngờ.",
      energyLevel: 75
    },
    3: {
      mindset: "Cuộc đời là một sàn diễn rực rỡ và bạn có quyền được thử mọi vai diễn mà mình yêu thích. Hãy để sự đa năng của bạn được tỏa sáng.",
      action: "Bắt đầu một kênh truyền thông mới, thử sức với nghệ thuật hoặc đơn giản là kể câu chuyện của bạn theo một cách lôi cuốn hơn.",
      opportunity: "Bạn nhận được sự chú ý đặc biệt từ đám đông, sức ảnh hưởng cá nhân tăng vọt mang lại những cơ hội truyền thông hấp dẫn.",
      energyLevel: 90
    },
    4: {
      mindset: "Tự do không có nghĩa là vô kỷ luật. Chính những nguyên tắc cá nhân sẽ là đôi cánh giúp bạn bay cao mà không bị lạc lối.",
      action: "Thiết lập một lịch trình làm việc di động thông minh. Học cách quản lý thời gian hiệu quả ngay cả khi bạn đang trong hành trình di chuyển.",
      opportunity: "Hiệu suất công việc tăng cao vượt mong đợi nhờ vào việc bạn tìm thấy cách làm việc mới thông minh và tiết kiệm sức lực hơn.",
      energyLevel: 65
    },
    5: {
      mindset: "Hôm nay là ngày của những bứt phá không giới hạn. Hãy phá bỏ mọi rào cản đang kìm hãm sự phát triển của bạn bấy lâu nay.",
      action: "Thực hiện một chuyến đi đột xuất, thay đổi hoàn toàn phong cách cá nhân hoặc đưa ra một quyết định mang tính bước ngoặt.",
      opportunity: "Một nguồn năng lượng bùng nổ giúp bạn thu hút được những cơ hội tài chính ngắn hạn đầy hứa hẹn hoặc một sự tự do tuyệt đối trong tâm hồn.",
      energyLevel: 100
    },
    6: {
      mindset: "Sự thay đổi sẽ trở nên ý nghĩa hơn khi nó mang lại hạnh phúc cho những người xung quanh. Hãy mang hơi thở mới vào không gian gia đình.",
      action: "Cùng người thân thực hiện một trải nghiệm mới mẻ như đi du lịch cùng nhau hoặc thay đổi không gian sống hiện tại.",
      opportunity: "Những rạn nứt cũ được xóa bỏ nhờ vào những trải nghiệm chung vui vẻ, mang lại một luồng sinh khí mới cho các mối quan hệ gia đình.",
      energyLevel: 80
    },
    7: {
      mindset: "Mỗi hành trình mới thực chất là một cuộc thám hiểm sâu vào thế giới nội tâm. Hãy học hỏi từ chính những biến động xung quanh bạn.",
      action: "Tham gia các khóa đào tạo ngắn hạn, các workshop về tư duy mới. Hãy quan sát thế giới với con mắt của một triết gia đang đi tìm chân lý.",
      opportunity: "Một sự khai sáng về tư duy sẽ giúp bạn tìm thấy hướng đi mới cho sự nghiệp, thoát khỏi những bế tắc về tầm nhìn bấy lâu nay.",
      energyLevel: 70
    },
    8: {
      mindset: "Tốc độ và sự quyết đoán chính là chìa khóa để giành lấy những nguồn lực lớn trong ngày hôm nay. Hãy hành động nhanh nhưng phải tỉnh táo.",
      action: "Nắm bắt các cơ hội đầu tư lướt sóng hoặc đưa ra các quyết định đàm phán chớp nhoáng. Hãy tin vào bản năng kinh doanh nhạy bén của mình.",
      opportunity: "Một khoản lợi nhuận đột biến hoặc một thương vụ thành công nhanh chóng sẽ mang lại cho bạn sự hưng phấn và thịnh vượng.",
      energyLevel: 95
    },
    9: {
      mindset: "Hãy là người truyền cảm hứng về sự tự do và lòng nhân ái cho thế giới. Buông bỏ những gì đã cũ để đón nhận những giá trị rộng lớn hơn.",
      action: "Chia sẻ những trải nghiệm sống của bạn để giúp ích cho người khác. Tham gia vào những hoạt động thiện nguyện mang tính quốc tế hoặc quy mô lớn.",
      opportunity: "Sức ảnh hưởng của bạn vượt ra ngoài biên giới thông thường, bạn nhận được sự kính trọng và những cơ hội làm việc ở tầm cỡ cao hơn.",
      energyLevel: 85
    }
  },

  // --- THẾ GIỚI 6: TRÁCH NHIỆM, TÌNH YÊU & NUÔI DƯỠNG ---
  6: {
    1: {
      mindset: "Lãnh đạo bằng trái tim là hình thức quyền lực bền vững nhất. Hãy bảo vệ và dẫn dắt đội nhóm của mình bằng lòng trắc ẩn.",
      action: "Đứng ra chịu trách nhiệm cho những sai sót chung và hướng dẫn cấp dưới bằng sự kiên nhẫn. Hãy là người anh lớn, chị lớn trong tổ chức.",
      opportunity: "Sự trung thành của đội ngũ và uy tín cá nhân của bạn tăng cao, chuẩn bị cho những vị trí quản lý cấp cao hơn trong tổ chức.",
      energyLevel: 85
    },
    2: {
      mindset: "Hạnh phúc thực sự là khi ta thấu cảm được nỗi đau của người khác và sẵn lòng xoa dịu nó. Hãy dành thời gian để lắng nghe.",
      action: "Dành trọn vẹn sự quan tâm cho người thương hoặc một người bạn đang gặp khó khăn. Một cái ôm hay một lời khẳng định có giá trị rất lớn.",
      opportunity: "Mối quan hệ trở nên gắn kết sâu sắc, tạo ra một bệ phóng tinh thần vững chắc cho mọi kế hoạch phát triển cá nhân của bạn.",
      energyLevel: 80
    },
    3: {
      mindset: "Sáng tạo là cách tuyệt vời nhất để bạn thể hiện tình yêu với cuộc đời. Hãy dùng tài năng của mình để mang lại niềm vui cho mọi người.",
      action: "Tham gia các hoạt động cộng đồng, tổ chức một buổi họp mặt vui vẻ hoặc sáng tạo những món quà thủ công đầy ý nghĩa.",
      opportunity: "Tên tuổi của bạn gắn liền với những giá trị tích cực, thu hút được nhiều người muốn được cộng tác và giúp đỡ bạn.",
      energyLevel: 85
    },
    4: {
      mindset: "Tình yêu cần một mái nhà vững chãi và những quy tắc để tồn tại bền lâu. Hãy lập kế hoạch bảo vệ những người bạn yêu quý.",
      action: "Lập kế hoạch sức khỏe, mua bảo hiểm hoặc sắp xếp lại ngân sách gia đình một cách khoa học. Hãy hành động vì sự an tâm lâu dài.",
      opportunity: "Sự ổn định về tài chính và gia đạo mang lại cho bạn sự tự tin để tập trung hoàn toàn vào việc phát triển sự nghiệp đỉnh cao.",
      energyLevel: 75
    },
    5: {
      mindset: "Một chút đổi mới sẽ làm cho cuộc sống gia đình thêm phần thú vị và tràn đầy sức sống. Đừng để trách nhiệm trở thành gánh nặng khô khan.",
      action: "Thử thay đổi lối sống của cả gia đình theo hướng lành mạnh và năng động hơn. Khám phá những sở thích chung mới mẻ.",
      opportunity: "Bạn tìm thấy sự cân bằng hoàn hảo giữa công việc và cuộc sống, giúp tái tạo năng lượng cho cả tâm hồn lẫn thể chất.",
      energyLevel: 80
    },
    6: {
      mindset: "Hôm nay, bạn là hiện thân của tình yêu vô điều kiện. Khi bạn cho đi mà không mong cầu, vũ trụ sẽ hồi đáp cho bạn gấp bội.",
      action: "Thực hiện các hoạt động thiện nguyện, giúp đỡ những người xung quanh mà không cần lý do. Hãy chăm sóc bản thân mình như cách bạn chăm sóc người khác.",
      opportunity: "Một nguồn năng lượng phước lành cực lớn sẽ đến, giúp mọi việc trong ngày của bạn diễn ra thuận lợi một cách kỳ diệu.",
      energyLevel: 100
    },
    7: {
      mindset: "Hiểu thấu tâm lý của người khác là cách tốt nhất để bạn yêu thương họ đúng cách. Hãy dành thời gian để quan sát và học hỏi.",
      action: "Tìm hiểu thêm về các ngôn ngữ tình yêu, tâm lý học lứa tuổi hoặc thiền định cùng người thân. Hãy đi sâu vào thế giới nội tâm.",
      opportunity: "Bạn khám phá ra những giá trị tinh thần mới mẻ trong mối quan hệ, giúp xóa tan những bóng ma nghi ngờ và bất an bấy lâu nay.",
      energyLevel: 65
    },
    8: {
      mindset: "Sự thịnh vượng vật chất là công cụ để bạn chăm sóc tốt nhất cho những người mình yêu thương. Hãy tạo ra các giá trị kinh tế bền vững.",
      action: "Đầu tư vào giáo dục, bất động sản gia đình hoặc các dự án mang tính kế thừa. Hãy quyết đoán trong các giao dịch mang lại lợi ích chung.",
      opportunity: "Một nguồn thu nhập lớn hoặc sự gia tăng giá trị tài sản gia đình sẽ đến như một phần thưởng cho sự tận tụy của bạn.",
      energyLevel: 90
    },
    9: {
      mindset: "Tình yêu thương của bạn không chỉ dành riêng cho gia đình, mà còn lan tỏa đến cả cộng đồng rộng lớn. Hãy thực hiện sứ mệnh của mình.",
      action: "Tham gia các dự án xã hội quy mô lớn, giáo dục hoặc hỗ trợ cộng đồng. Hãy để trái tim bạn rung động trước những nỗi đau của thế giới.",
      opportunity: "Sự kính trọng và lòng biết ơn của cộng đồng sẽ nâng tầm vị thế của bạn lên một đẳng cấp mới, trở thành một người dẫn dắt tinh thần.",
      energyLevel: 85
    }
  },

  // --- THẾ GIỚI 7: TRÍ TUỆ, CHIÊM NGHIỆM & SỰ THẤU THỊ ---
  7: {
    1: {
      mindset: "Trí tuệ độc lập chính là vũ khí mạnh nhất của bạn. Đừng để những ý kiến bên ngoài làm nhiễu loạn những suy luận sắc sảo của bản thân.",
      action: "Dành thời gian để viết lách, nghiên cứu hoặc thực hiện những dự án cá nhân đòi hỏi sự tập trung cao độ. Hãy tin vào trực giác khoa học của mình.",
      opportunity: "Bạn nhận được sự nể trọng như một chuyên gia tư vấn hoặc một nhà hoạch định chiến lược nhờ vào những nhận định độc đáo.",
      energyLevel: 70
    },
    2: {
      mindset: "Trong sự tĩnh lặng tuyệt đối, bạn sẽ nghe thấy những rung động của vũ trụ. Sự kết nối tâm linh hôm nay mạnh mẽ hơn bao giờ hết.",
      action: "Đọc sách cùng một người bạn tâm giao hoặc tham gia một buổi thiền định chung. Hãy lắng nghe những lời khuyên từ những người thầy tâm linh.",
      opportunity: "Một người dẫn đường (mentor) hoặc một tri thức bí mật sẽ xuất hiện, giúp bạn giải đáp những thắc mắc lớn lao về cuộc đời.",
      energyLevel: 60
    },
    3: {
      mindset: "Kiến thức sẽ trở nên sống động và có sức mạnh nhất khi được sẻ chia với sự hào hứng. Hãy là người truyền bá tri thức bằng sự sáng tạo.",
      action: "Viết blog, thuyết trình hoặc giảng dạy về những gì bạn đã chiêm nghiệm được. Dùng ngôn từ đẹp đẽ để diễn đạt những chân lý trừu tượng.",
      opportunity: "Ý tưởng của bạn được đón nhận rộng rãi và tạo ra một luồng sinh khí mới trong cộng đồng những người ham học hỏi.",
      energyLevel: 75
    },
    4: {
      mindset: "Mọi sự khai sáng đều cần được hệ thống hóa để trở thành những công cụ thực tiễn. Hãy biến tri thức thành những quy trình khoa học.",
      action: "Xây dựng các bộ tiêu chuẩn, viết giáo trình hoặc sắp xếp lại cơ sở dữ liệu tri thức của bạn một cách ngăn nắp.",
      opportunity: "Bạn tạo ra một di sản tri thức có tính ứng dụng cao, mang lại sự ổn định và vị thế vững chắc trong lĩnh vực chuyên môn của mình.",
      energyLevel: 80
    },
    5: {
      mindset: "Mỗi biến động bên ngoài đều mang trong mình một bài học về sự vô thường. Hãy quan sát thế giới với sự tò mò và thấu thị.",
      action: "Thay đổi môi trường nghiên cứu, đi thực tế hoặc tham gia vào các cuộc thảo luận trái chiều. Hãy để những góc nhìn mới làm giàu thêm tư duy.",
      opportunity: "Một bước ngoặt trong nhận thức sẽ giúp bạn định hướng lại hoàn toàn sự nghiệp theo một cách thông thái và hiệu quả hơn.",
      energyLevel: 75
    },
    6: {
      mindset: "Giáo dục tinh thần là món quà quý giá nhất bạn có thể tặng cho người thân. Hãy mang những bài học thông thái vào trong đời sống thường nhật.",
      action: "Chia sẻ những triết lý sống tích cực với gia đình hoặc hướng dẫn con cái về những giá trị đạo đức. Hãy nuôi dưỡng tâm hồn của tổ ấm.",
      opportunity: "Gia đình trở thành một bến đỗ bình an và trí tuệ, nơi mọi thành viên đều tìm thấy sự an lạc và thấu hiểu lẫn nhau.",
      energyLevel: 80
    },
    7: {
      mindset: "Hôm nay là ngày để bạn chạm vào bản thể cao nhất của chính mình. Đừng sợ sự cô độc, vì đó chính là thánh đường của sự khai sáng.",
      action: "Tách khỏi mọi thiết bị điện tử và sự ồn ào. Dành ít nhất một giờ để thiền sâu hoặc đối thoại nội tâm một cách trung thực nhất.",
      opportunity: "Một sự đột phá về nhận thức (Satori) sẽ xuất hiện, giúp bạn nhìn thấu bản chất của mọi vấn đề và tìm thấy sự bình an tuyệt đối.",
      energyLevel: 100
    },
    8: {
      mindset: "Trí tuệ tinh anh khi kết hợp với tư duy chiến lược sẽ tạo ra những giá trị vật chất khổng lồ. Hãy thực dụng hóa những kiến thức của bạn.",
      action: "Ra các quyết định đầu tư dựa trên sự phân tích dữ liệu chuyên sâu. Tư vấn chiến lược cho các đối tác lớn hoặc chốt những thương vụ đòi hỏi chất xám.",
      opportunity: "Một nguồn lợi nhuận lớn từ các tài sản trí tuệ hoặc các quyết định đúng đắn sẽ khẳng định quyền lực của tri thức trong tay bạn.",
      energyLevel: 85
    },
    9: {
      mindset: "Khi tri thức đạt đến đỉnh cao, nó sẽ trở thành lòng nhân ái. Hãy trao đi những gì bạn biết để giúp thế giới bớt đi những u mê.",
      action: "Hoàn thành một công trình nghiên cứu, một cuốn sách hoặc một khóa giảng dạy cộng đồng. Hãy chia sẻ tinh hoa trí tuệ mà không mưu cầu.",
      opportunity: "Sứ mệnh tri thức của bạn được hoàn thành rực rỡ, để lại những giá trị trường tồn cho thế hệ mai sau và nhận được sự kính trọng sâu sắc.",
      energyLevel: 85
    }
  },

  // --- THẾ GIỚI 8: QUYỀN LỰC, THÀNH TỰU & TÀI CHÍNH ---
  8: {
    1: {
      mindset: "Bạn đang nắm giữ thanh gươm của quyền lực và sự tự quyết. Hãy dùng nó để khai phá những vùng đất mới cho sự nghiệp của mình.",
      action: "Đưa ra những quyết định tài chính quan trọng một cách độc lập. Hãy nắm quyền kiểm soát cuộc chơi và khẳng định vị thế dẫn đầu.",
      opportunity: "Một vị trí lãnh đạo mới hoặc quyền điều hành một dự án lớn sẽ thuộc về bạn ngay khi bạn thể hiện được bản lĩnh cá nhân.",
      energyLevel: 95
    },
    2: {
      mindset: "Một nhà thương thuyết tài ba là người biết biến đối thủ thành đồng minh trên con đường tìm kiếm sự thịnh vượng.",
      action: "Tổ chức các cuộc đàm phán hợp tác dựa trên tinh thần đôi bên cùng có lợi. Hãy dùng sự khéo léo để đạt được những thỏa thuận kinh tế lớn.",
      opportunity: "Một hợp đồng giá trị hoặc một sự hậu thuẫn tài chính mạnh mẽ từ đối tác sẽ giúp bạn tiến xa hơn trên con đường sự nghiệp.",
      energyLevel: 80
    },
    3: {
      mindset: "Sự rạng rỡ và sức lôi cuốn cá nhân chính là thỏi nam châm thu hút tiền bạc và cơ hội. Hãy xây dựng một hình ảnh đầy quyền lực.",
      action: "Đầu tư vào thương hiệu cá nhân, tham gia các sự kiện truyền thông hoặc quảng bá thành quả của bạn một cách thông minh và tinh tế.",
      opportunity: "Những cơ hội từ giới truyền thông hoặc những lời mời hợp tác danh giá sẽ tìm đến, giúp uy tín của bạn tăng vọt.",
      energyLevel: 85
    },
    4: {
      mindset: "Sự giàu có bền vững được xây dựng trên nền tảng của sự kỷ luật và khả năng quản trị rủi ro tuyệt vời. Đừng để lòng tham che mờ lý trí.",
      action: "Kiểm soát chi phí chặt chẽ, tối ưu hóa quy trình sản xuất và đầu tư vào những giá trị thực chất. Hãy hành động một cách thực tế.",
      opportunity: "Tài sản ròng của bạn gia tăng đáng kể và bạn xây dựng được một hệ thống vận hành tự động, mang lại sự an tâm tài chính lâu dài.",
      energyLevel: 90
    },
    5: {
      mindset: "Thị trường luôn biến động và người chiến thắng là người biết đón đầu những làn sóng mới. Hãy linh hoạt và nhạy bén với những xu hướng.",
      action: "Thử sức với các danh mục đầu tư mới hoặc cải tiến mô hình kinh doanh theo hướng hiện đại hơn. Hãy quyết đoán với các cơ hội ngắn hạn.",
      opportunity: "Một khoản lợi nhuận đột biến hoặc một thương vụ thành công ngoài mong đợi sẽ đến nếu bạn dám hành động nhanh và khác biệt.",
      energyLevel: 95
    },
    6: {
      mindset: "Sự giàu sang chỉ thực sự ý nghĩa khi nó mang lại sự bảo đảm và tương lai tươi sáng cho những người bạn thương yêu.",
      action: "Đầu tư vào các quỹ giáo dục cho con cái, mua sắm các thiết bị chăm sóc sức khỏe hoặc cải thiện chất lượng sống của gia đình.",
      opportunity: "Bạn nhận được sự ủng hộ tuyệt đối từ hậu phương, tạo ra nguồn động lực to lớn để bạn chinh phục những đỉnh cao mới trong sự nghiệp.",
      energyLevel: 85
    },
    7: {
      mindset: "Sự thấu thị về thị trường ngách và những quy luật ngầm của dòng tiền sẽ giúp bạn đứng vững trên đỉnh cao. Hãy nghiên cứu kỹ trước khi hành động.",
      action: "Dành thời gian phân tích thị trường, tìm hiểu các ngách đầu tư tiềm năng mà ít người chú ý. Hãy là một nhà đầu tư có chiều sâu.",
      opportunity: "Bạn phát hiện ra một cơ hội đầu tư vàng có tính bảo mật cao, mang lại lợi nhuận vượt trội mà không cần quá phô trương.",
      energyLevel: 75
    },
    8: {
      mindset: "Hôm nay, bạn đang ở đỉnh cao năng lực cá nhân. Mọi nguồn lực của vũ trụ đang hội tụ để giúp bạn đạt được những mục tiêu lớn nhất.",
      action: "Điều hành những dự án quan trọng nhất, ra quyết định đầu tư lớn hoặc chốt hạ những thương vụ mang tính lịch sử của cá nhân bạn.",
      opportunity: "Danh tiếng và tiền bạc cùng đạt đến đỉnh cao. Bạn khẳng định được uy thế tuyệt đối của mình trong lĩnh vực đang theo đuổi.",
      energyLevel: 100
    },
    9: {
      mindset: "Quyền lực thực sự là khả năng tạo ra sự thay đổi tích cực cho thế giới. Hãy dùng nguồn lực của mình để phụng sự cộng đồng.",
      action: "Thực hiện các dự án thiện nguyện quy mô lớn hoặc đầu tư vào các doanh nghiệp xã hội. Hãy chia sẻ thành quả của mình một cách thông thái.",
      opportunity: "Sự kính trọng từ xã hội và một di sản bền vững sẽ là thành tựu lớn nhất mà bạn đạt được, giúp tên tuổi của bạn còn mãi.",
      energyLevel: 85
    }
  },

  // --- THẾ GIỚI 9: LÒNG NHÂN ÁI, SỰ HOÀN TẤT & KHỞI ĐẦU MỚI ---
  9: {
    1: {
      mindset: "Cái tôi cá nhân chỉ thực sự vĩ đại khi nó gắn liền với lợi ích của nhân loại. Hãy là người lãnh đạo tinh thần của thời đại mới.",
      action: "Đứng ra khởi xướng một phong trào vì cộng đồng hoặc dẫn dắt đội nhóm thực hiện một sứ mệnh mang tính nhân văn cao cả.",
      opportunity: "Bạn nhận được sự ủng hộ rộng rãi từ đám đông và sự hỗ trợ từ những nguồn lực không ngờ, giúp tầm nhìn của bạn trở thành hiện thực.",
      energyLevel: 85
    },
    2: {
      mindset: "Lòng bao dung và sự thấu cảm là liều thuốc chữa lành mọi nỗi đau. Hãy là người hòa giải giữa những xung đột xung quanh bạn.",
      action: "Lắng nghe tâm tư của những người đang gặp khó khăn, thực hiện những hành động kết nối và xoa dịu. Hãy để sự dịu dàng của bạn lan tỏa.",
      opportunity: "Sự bình an nội tâm sâu sắc và những mối quan hệ chân thành sẽ là phần thưởng quý giá nhất dành cho tâm hồn bạn ngày hôm nay.",
      energyLevel: 80
    },
    3: {
      mindset: "Sáng tạo là ngôn ngữ để bạn giao tiếp với cả thế giới về những điều tốt đẹp. Hãy truyền cảm hứng sống tích cực đến mọi người.",
      action: "Chia sẻ những tác phẩm nghệ thuật, những câu chuyện về lòng tốt hoặc những thông điệp lạc quan qua các kênh truyền thông của bạn.",
      opportunity: "Sức ảnh hưởng của bạn chạm đến trái tim của nhiều người, tạo ra một làn sóng tích cực và thu hút những duyên lành đến với bạn.",
      energyLevel: 85
    },
    4: {
      mindset: "Sự hoàn tất về mặt vật chất là bước chuẩn bị cần thiết cho hành trình tinh thần tiếp theo. Hãy dọn dẹp và sắp xếp lại mọi thứ.",
      action: "Hoàn tất các giấy tờ pháp lý, đóng lại các dự án cũ và thực hiện các nghĩa vụ cuối cùng với đối tác. Hãy làm mọi việc thật trọn vẹn.",
      opportunity: "Sự thanh thản khi gánh nặng được trút bỏ. Bạn nhận được những thành quả xứng đáng cuối cùng của một chu kỳ lao động miệt mài.",
      energyLevel: 80
    },
    5: {
      mindset: "Buông bỏ không phải là mất đi, mà là giải phóng bản thân để đón nhận những chân trời mới tự do hơn. Hãy dũng cảm từ bỏ những thói quen cũ.",
      action: "Chấm dứt những mối quan hệ không còn phù hợp, từ bỏ những định kiến hạn hẹp và mở lòng đón nhận những trải nghiệm xa lạ.",
      opportunity: "Một cuộc gặp gỡ mang tính định mệnh hoặc một bước ngoặt lớn về sự nghiệp sẽ xuất hiện ngay khi bạn dám buông tay khỏi quá khứ.",
      energyLevel: 90
    },
    6: {
      mindset: "Tình yêu thương không biên giới là sức mạnh lớn nhất giúp bạn vượt qua mọi giới hạn của bản thân. Hãy cống hiến và phụng sự.",
      action: "Chăm sóc và giáo dục người khác bằng tất cả sự tận tâm. Tham gia các hoạt động nuôi dưỡng trẻ em hoặc hỗ trợ những người yếu thế.",
      opportunity: "Bạn nhận được lòng biết ơn sâu sắc và sự kính trọng từ những người xung quanh, cảm nhận được sự đủ đầy về mặt tâm hồn.",
      energyLevel: 90
    },
    7: {
      mindset: "Hành trình vạn dặm cuối cùng cũng quay trở về với chính mình. Hãy chiêm nghiệm về tất cả những bài học mà cuộc đời đã dạy bạn.",
      action: "Viết tổng kết về một giai đoạn sống, thực hiện một chuyến đi về nguồn hoặc dành thời gian thiền định sâu để hiểu về sứ mệnh của mình.",
      opportunity: "Một sự nâng tầng nhận thức vượt bậc, bạn nhìn thấy rõ con đường tiếp theo và cảm thấy sẵn sàng cho một khởi đầu vĩ đại.",
      energyLevel: 80
    },
    8: {
      mindset: "Khi bạn giàu có về tinh thần, nguồn lực vật chất sẽ tự động tìm đến để bạn thực hiện những dự án nhân văn lớn hơn.",
      action: "Phân bổ nguồn lực tài chính cho các hoạt động xã hội, đầu tư vào các dự án bền vững và có ích cho sự phát triển của nhân loại.",
      opportunity: "Danh tiếng bền vững và sự thịnh vượng lâu dài sẽ đến với bạn như một quy luật tất yếu của sự gieo hạt và gặt hái.",
      energyLevel: 95
    },
    9: {
      mindset: "Hôm nay là thời khắc của sự hoàn hảo và trọn vẹn. Hãy tha thứ cho mọi lỗi lầm, khép lại chương cũ và sẵn sàng cho một bình minh mới.",
      action: "Thực hiện những mong nguyện cuối cùng của chu kỳ này, nói lời chia tay với những gì đã qua và dành thời gian tĩnh lặng để chào đón tương lai.",
      opportunity: "Một cảm giác giác ngộ và tự do tuyệt đối. Một cánh cửa của một chu kỳ 9 năm mới đang mở ra trước mắt bạn đầy rạng rỡ và hy vọng.",
      energyLevel: 100
    }
  }
};