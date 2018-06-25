module HomeHelper
  def bridge_builders_title
    <<-DOC
Bridge Builders: Richard Raxworthy (1932-2003) was a professional interviewer whose expertise in interviewing is particularly directed to politicians, trade unionists, trades and working people.Work on the Sydney Harbour Bridge commenced in 1923 and the bridge was officially opened in 1932. It was designed by J. J. C. Bradfield, chief engineer of the project, on behalf of the New South Wales government, and spans Sydney Harbour between Dawes Point on the south and Milsons Point on the northern side. Dorman, Long &amp; Co. Ltd England won the tender. Erection was under Lawrence Ennis, Director of Construction. The project was a major employer through the Depression years in New South Wales.
    DOC
  end

  def faith_builders_title
    <<-DOC
Faith Bandler: MLOH 307: Faith Bandler interviewed by Carolyn Craig, 1997"
    DOC
  end

  def collection_list(list)
    html = "<a data-filter='collection' data-id='' data-value='ALL' class='select-option collection filter-by' data-active='All Collections' title='All Collections' role='menuitemradio' aria-checked='true'>All Collections</a>"
    list.each do |item|
      html += "<a data-filter='collection' data-id='#{item.id}' class='select-option collection filter-by' title='#{item.title}' role='menuitemradio' aria-checked='true'>#{item.title}</a>"
    end
    html
  end

  def sorting_list(list)
    html = ""
    list.each do |item|
      html += "<a data-filter='sorting' data-id='#{item.id}' class='select-option collection filter-by' title='#{item.title}' role='menuitemradio' aria-checked='true'>#{item.title}</a>"
    end
    html
  end


end